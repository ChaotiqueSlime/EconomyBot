module.exports = {
    name: "hourly",
    description: "Hourly Crate",
    aliases: [],
    cooldown: 3600,
    async execute(message) {
        if(message.deletable) message.delete()
        const Discord = require('discord.js')
        const DB = require('djs-economy')
        const first = await DB.GetCash(message.author.id);
        console.log(`${message.author.username} First Timer Check: ${first.cash}`)
        const cratesicon = (`https://images-ext-2.discordapp.net/external/fDqPhcYfKo-97vHDCdJW_mJSTUmxYcfmImIGsRVdA5k/%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDQ0ZThlNGMtZGIzNC00MzYxLTg1MDgtZTcyODhkNGNjMTBmXC9kNTFidnBlLWE2YzdjZTI3LTA5ODgtNDM3NS1hOTAyLWFiZTY3YTgwYjYwNS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.OHaADKw8oSYtPeXCHb51Fk2pTCOyjoRRs2aDbgiGo0g/https/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d44e8e4c-db34-4361-8508-e7288d4cc10f/d51bvpe-a6c7ce27-0988-4375-a902-abe67a80b605.gif`)
        await DB.AddCash(message.author.id, 100000);
        var output = await DB.GetCash(message.author.id);
        const formatNumber = require('../../functions/regex')
        const embed = new Discord.MessageEmbed()
        .setColor('#cf13f0')
        .setThumbnail(cratesicon)
        .setDescription(`💵 **100,000** was added to your balance\nYou Now Have $${(formatNumber(output.cash))}`)
        .setAuthor(`Hourly Crate Claimed`, 'https://cdn.discordapp.com/attachments/795772613229412372/797311435864408084/764097781265989672.gif');
        console.log(`${message.author.username} (Balance: $${(formatNumber(output.cash))})`)
        return message.channel.send(embed);
    }
}