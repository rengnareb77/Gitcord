import dotenv from 'dotenv';
import { Client, Collection } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { SlashCommand } from '../types';

dotenv.config();

const client = new Client({
    intents:8
})

client.commands = new Collection<string,SlashCommand>();

const handlerDir = join(__dirname, './handlers');

readdirSync(handlerDir).forEach((file) => {
    require(`${handlerDir}/${file}`)(client);
});

client.login(process.env.TOKEN)