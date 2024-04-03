import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    loadMessageCommandListeners: true
});  

client.login(process.env['DISCORD_TOKEN']);
Bun.serve({
    fetch() {
        return new Response("Hello world!");
    },
    port: 8080
});