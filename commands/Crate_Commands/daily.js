module.exports = {
    name: "daily",
    description: "Daily Crate",
    aliases: [],
    cooldown: 86400,
    async execute(message) {
        if(message.deletable) message.delete()
        const Discord = require('discord.js')
        const DB = require('djs-economy')
        const first = await DB.GetCash(message.author.id);
        console.log(`${message.author.username} First Timer Check: ${first.cash}`)
        const cratesicon = (`https://images-ext-2.discordapp.net/external/fDqPhcYfKo-97vHDCdJW_mJSTUmxYcfmImIGsRVdA5k/%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDQ0ZThlNGMtZGIzNC00MzYxLTg1MDgtZTcyODhkNGNjMTBmXC9kNTFidnBlLWE2YzdjZTI3LTA5ODgtNDM3NS1hOTAyLWFiZTY3YTgwYjYwNS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.OHaADKw8oSYtPeXCHb51Fk2pTCOyjoRRs2aDbgiGo0g/https/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d44e8e4c-db34-4361-8508-e7288d4cc10f/d51bvpe-a6c7ce27-0988-4375-a902-abe67a80b605.gif`)
        await DB.AddCash(message.author.id, 1000000)
        var output = await DB.GetCash(message.author.id);
        const formatNumber = require('../../functions/regex')
        const embed = new Discord.MessageEmbed()
        .setColor('#cf13f0')
        .setThumbnail(cratesicon)
        .setDescription(`💵 **1,000,000** was added to your balance\nYou Now Have $${(formatNumber(output.cash))}`)
        .setTitle('Daily Crate Claimed!');
        console.log(`${message.author.username} (Balance: $${(formatNumber(output.cash))})`)
        message.channel.send(embed)
    }
} 