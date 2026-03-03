import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
        return NextResponse.redirect(`${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}/menu?spotify_error=missing_params`);
    }

    try {
        const decodedState = JSON.parse(Buffer.from(state, 'base64').toString('utf8'));
        const uid = decodedState.uid;

        if (!uid) {
            throw new Error('Invalid state payload');
        }

        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const host = request.headers.get('host');
        const redirectUri = `${protocol}://${host}/api/spotify/callback`;

        const authOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }).toString()
        };

        const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error_description || data.error);
        }

        const { access_token, refresh_token, expires_in } = data;

        // Redirect back to menu and let the authenticated client SDK save the tokens
        return NextResponse.redirect(`${protocol}://${host}/menu?spotify_connected=true&access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);

    } catch (error: any) {
        console.error('Spotify callback error:', error);
        return NextResponse.redirect(`${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}/menu?spotify_error=true`);
    }
}
