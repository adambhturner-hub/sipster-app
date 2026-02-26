import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sipster - The AI Bartender',
        short_name: 'Sipster',
        description: 'Your intelligent, interactive cocktail companion. Scan your fridge, build your bar, and discover new classics.',
        start_url: '/',
        display: 'standalone',
        background_color: '#030712', // Matches tailwind gray-950
        theme_color: '#030712',
        icons: [
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
