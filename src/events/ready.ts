import { Client, Events } from "discord.js"
import { BotEvent } from "../../types"
const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute: (client:Client) => {
        console.log(`Logged in as ${client.user.tag} !`);
        client.user.setActivity("Gitcord");
    }
}

export default event;