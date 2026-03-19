import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { CLASSIC_COCKTAILS, Cocktail } from '@/data/cocktails';
import OpenAI from 'openai';
import { adminAuth } from '@/lib/firebase-admin';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { uid, spotifyData, myBar } = await request.json();

        if (!uid || !spotifyData) {
            return NextResponse.json({ error: 'Missing required fields or not connected' }, { status: 400 });
        }

        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
        }

        const idToken = authHeader.split('Bearer ')[1];
        try {
            const decodedToken = await adminAuth?.verifyIdToken(idToken);
            if (!decodedToken || decodedToken.uid !== uid) {
                return NextResponse.json({ error: 'Unauthorized: UID mismatch' }, { status: 401 });
            }
        } catch (error) {
            return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
        }

        let accessToken = spotifyData.accessToken;

        // Check if token is expired (giving a 60 second buffer)
        if (Date.now() > spotifyData.expiresAt - 60000) {
            const authOptions = {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: spotifyData.refreshToken
                }).toString()
            };

            const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
            const data = await response.json();

            if (data.error) {
                // Refresh token invalid or revoked
                return NextResponse.json({ error: 'auth_revoked' }, { status: 401 });
            }

            accessToken = data.access_token;
            const newRefreshToken = data.refresh_token || spotifyData.refreshToken;

            // Inform the client that token was refreshed
            spotifyData.accessToken = accessToken;
            spotifyData.refreshToken = newRefreshToken;
            spotifyData.expiresAt = Date.now() + data.expires_in * 1000;
        }

        // Fetch currently playing
        const trackRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        let trackData = null;
        if (trackRes.status === 200) {
            trackData = await trackRes.json();
        }

        let trackName = "";
        let artistName = "";
        let albumArt = "";
        let isPlaying = true;

        if (!trackData || !trackData.item) {
            // Fallback to recently played
            const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const recentData = await recentRes.json();

            if (recentData && recentData.items && recentData.items.length > 0) {
                trackData = recentData.items[0];
                trackName = trackData.track.name;
                artistName = trackData.track.artists.map((a: any) => a.name).join(', ');
                albumArt = trackData.track.album.images[0]?.url;
                isPlaying = false;
            } else {
                return NextResponse.json({ error: 'no_music_found' }, { status: 404 });
            }
        } else {
            trackName = trackData.item.name;
            artistName = trackData.item.artists.map((a: any) => a.name).join(', ');
            albumArt = trackData.item.album.images[0]?.url;
        }

        // Prepare cocktail candidates (filter by makeable or near-makeable)
        const candidates = CLASSIC_COCKTAILS.filter((c: Cocktail) => {
            const ingredients = c.ingredients.filter(ing =>
                ing.item &&
                ing.item !== 'Simple Syrup' &&
                ing.item !== 'Club Soda' &&
                ing.item !== 'Egg White' &&
                ing.amount !== 'Garnish'
            );

            let matchCount = 0;
            for (const ing of ingredients) {
                if (myBar.some((i: string) => i.toLowerCase() === ing.item.toLowerCase())) {
                    matchCount++;
                }
            }

            // Allow if they have at least 50% of the significant ingredients
            return ingredients.length === 0 || (matchCount / ingredients.length) >= 0.5;
        }).map(c => c.name);

        // If no candidates (empty bar), just send all cocktails as a fallback
        const finalCandidates = candidates.length > 0 ? candidates : CLASSIC_COCKTAILS.map((c: Cocktail) => c.name);

        const prompt = `
You are Sipster, a master sommelier and cocktail pairing expert. 
The user is currently listening to ${trackName} by ${artistName}.
Based on the vibe, genre, and mood of this specific song, choose EXACTLY ONE cocktail from the provided list that perfectly matches the atmosphere.

Available cocktails: ${finalCandidates.join(', ')}

Respond ONLY with a valid JSON object in this exact format:
{
    "cocktailName": "The exact name of the cocktail from the list",
    "justification": "A fun, engaging, 2-to-3 sentence explanation of why this drink perfectly pairs with the vibe of the song. Be creative, reference the song's energy, and speak like a cool bartender."
}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Vibe checks don't need the heavy reasoning of 4o
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            temperature: 0.8,
        });

        const result = completion.choices[0].message.content;
        if (!result) throw new Error("No response from OpenAI");

        const parsedResult = JSON.parse(result);

        return NextResponse.json({
            success: true,
            refreshedSpotifyData: accessToken !== spotifyData.accessToken ? spotifyData : null,
            track: {
                name: trackName,
                artist: artistName,
                albumArt: albumArt,
                isPlaying: isPlaying
            },
            recommendation: {
                cocktailName: parsedResult.cocktailName,
                justification: parsedResult.justification
            }
        });

    } catch (error: any) {
        console.error('Vibe check error:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate vibe check' }, { status: 500 });
    }
}
