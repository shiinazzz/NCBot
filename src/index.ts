import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import * as characterAI from "./characterai";

const client = new SapphireClient({
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    loadMessageCommandListeners: true
});  

await characterAI.connect();
client.login(process.env['DISCORD_TOKEN']);