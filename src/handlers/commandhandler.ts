import { Client, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent, SlashCommand } from "../../types";

module.exports = async (client:Client) => {
    const body = []
    const commandsDir = join(__dirname, '../commands');
    readdirSync(commandsDir).forEach(file => {
        if (!file.endsWith('.js')) return;
        const command:SlashCommand = require(`${commandsDir}/${file}`).command;
        console.log(`Command ${command.name} loaded!`)
        body.push(command.data.toJSON())
        client.commands.set(command.name, command);
    });
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body:body });
    } catch (error) {
        console.error(error);
    }

};