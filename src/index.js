require("../../processEvents")
require('dotenv').config();

const db = require('quick.db');
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: new Intents(32767)/*["GUILDS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"]*/, partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "USER"] });
client.commands = new Collection();

fs.readdirSync(path.resolve(process.cwd(), "./commands"))
.filter(c => c.endsWith(".js"))
.forEach(f => {
    let command = require(`./commands/${f}`);
    client.commands.set(f.split(".js")[0], {
        name: f.split(".js")[0],
        aliases: command.aliases,
        description: command.description,
        run: command.run
    });
});
fs.readdirSync(path.resolve(process.cwd(), "./events"))
.filter(e => e.endsWith(".js"))
.forEach(f => {
    client.on(f.split(".js")[0], (x,y) => require(`./events/${f}`)(client, x, y));
});

client.login("ODU2NTkzODQ3OTExMzE3NTA0.G_Mi38.DuRnAQPvNQGoBJi0p5dCsl3pFeGO02oKRbKoHQ");

client.sendError = (msg, content) => {
    return msg.reply({ content: `🧐 - **${content}**`, components: [] });
}; client.editError = (msg, content) => {
    return msg.edit({ content: `🧐 - **${content}**`, components: [] });
}