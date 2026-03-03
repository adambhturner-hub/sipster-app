import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');

    if (!uid) {
        return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host');
    const redirectUri = `${protocol}://${host}/api/spotify/callback`;

    // Request scope to read currently playing and recently played tracks
    const scope = 'user-read-currently-playing user-read-recently-played';

    // Encode uid in state so we have it on callback
    const state = Buffer.from(JSON.stringify({ uid })).toString('base64');

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', clientId!);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('state', state);

    return NextResponse.redirect(authUrl.toString());
}
