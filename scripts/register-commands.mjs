import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env.local') });

const APP_ID = process.env.DISCORD_APP_ID;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!APP_ID || !BOT_TOKEN) {
    console.error("Missing DISCORD_APP_ID or DISCORD_BOT_TOKEN in .env.local");
    process.exit(1);
}

const commands = [
    {
        name: "sipster",
        description: "Look up a classic cocktail recipe.",
        options: [
            {
                name: "drink",
                description: "The name of the cocktail (e.g. Margarita, Old Fashioned)",
                type: 3, // STRING
                required: true
            }
        ]
    },
    {
        name: "ask-sipster",
        description: "Ask the AI bartender a mixology question.",
        options: [
            {
                name: "query",
                description: "What do you want to ask Sipster?",
                type: 3, // STRING
                required: true
            }
        ]
    }
];

async function registerCommands() {
    console.log(`Registering commands for App ID: ${APP_ID}...`);

    try {
        const response = await fetch(`https://discord.com/api/v10/applications/${APP_ID}/commands`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bot ${BOT_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commands)
        });

        if (response.ok) {
            console.log('Successfully registered slash commands!');
            const data = await response.json();
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.error('Failed to register commands:', response.statusText);
            const error = await response.text();
            console.error(error);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

registerCommands();
