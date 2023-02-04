const { Client } = require('discord.js');
const db = require('quick.db');
const translate = require('../discordtr.pro');

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    if(!db.has("invites")) db.set("invites", {});
    if(!db.has("users")) db.set("users", {});
    console.log(`${translate("olarak giriş yaptı", "Connected as")} ${client.user.tag}`);
    const guild = client.guilds.cache.get(require('../../config.json').serverID);
    if(!guild) return console.log("Botu sunucunuza eklemediniz!");
    try {
        var guildInvites = (await guild.invites.fetch());
    } catch {
        return console.log("Botun davetleri görüntüleme izni yok. Lütfen atayın.");
    };

    guildInvites
        .forEach(i => {
            db.set(`invites.${i.code}`, {
                inviterId: i.inviter?.id,
                code: i.code,
                uses: i.uses
            });
        });
    Object.values(db.get("invites"))
        .filter(i => !guildInvites.has(i.code))
        .forEach(i => db.delete(`invites.${i.code}`))
        const { joinVoiceChannel } = require("@discordjs/voice");
        const channel = client.channels.cache.get("1001069278512021594")
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        client.user.setPresence({ activity: { name: "Akin ❤️ Apricity", type: "PLAYING" }, status: "dnd" });
        client.user.setPresence({ activities: [{ name: "Akin ❤️ Apricity", type: "PLAYING" }], status: "dnd" });
}
