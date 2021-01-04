const { execute } = require("./booster");

module.exports = {
    name: "member",
    description: "yt members only",
    aliases: [],
    cooldown: 604800,
    async execute(message) {
        const Discord = require('discord.js')
        const DB = require('djs-economy')
        const cratesicon = (`https://images-ext-2.discordapp.net/external/fDqPhcYfKo-97vHDCdJW_mJSTUmxYcfmImIGsRVdA5k/%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDQ0ZThlNGMtZGIzNC00MzYxLTg1MDgtZTcyODhkNGNjMTBmXC9kNTFidnBlLWE2YzdjZTI3LTA5ODgtNDM3NS1hOTAyLWFiZTY3YTgwYjYwNS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.OHaADKw8oSYtPeXCHb51Fk2pTCOyjoRRs2aDbgiGo0g/https/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d44e8e4c-db34-4361-8508-e7288d4cc10f/d51bvpe-a6c7ce27-0988-4375-a902-abe67a80b605.gif`);
        const boostersrole = message.guild.roles.cache.find(r => r.name === "Patrons");
        if(message.member.roles.cache.has(boostersrole.id)) {
          await DB.AddCash(message.author.id, 10000000)
          const output = await DB.GetCash(message.author.id);
            const formatNumber = require('../../functions/regex');
            const embed = new Discord.MessageEmbed()
                .setColor('#cf13f0')
                .setThumbnail(cratesicon)
                .setDescription(`:dollar: **10,000,000** was added to your balance\nYou Now Have $${(formatNumber(output.cash))}`)
                .setTitle('Member Crate Claimed');
                message.channel.send(embed);
            } else {
            return message.channel.send(`You are not a youtube member ${message.author}`).then((msg) => {
                msg.delete({ timeout: 8000 })
            })
        }

    }
}