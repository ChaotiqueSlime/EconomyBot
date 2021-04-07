const { MessageEmbed } = require('discord.js');
const DB = require('djs-economy');
module.exports = {
    name: 'mine',
    description: 'mine and sell', 
    aliases: [],
    cooldown: 5000,
    async execute(message) {
        if(message.deletable) message.delete() 

        const BoostRole = message.guild.roles.cache.find(r => r.name === "Server Booster");

        let hasPermission = false;

        if(BoostRole){if(message.member.roles.cache.has(BoostRole.id)) hasPermission = true;}

        if(!hasPermission){
            const noAccess = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`You Are Not A Booster Or Youtube Member ${message.author.username}`, 'https://cdn.discordapp.com/attachments/795772613229412372/797310165501607964/ohyes8.gif');
            return message.channel.send(noAccess).then(m => m.delete({ timeout: 15000 }));
        }

        var emoji1 = message.client.emojis.cache.get("796057222341066772"); //Implement Emoji And Add Its Emoji ID | Emoji = Cobblestone
        var emoji2 = message.client.emojis.cache.get("796057274203504710"); //Implement Emoji And Add Its Emoji ID | Emoji = Iron
        var emoji3 = message.client.emojis.cache.get("796057189864701973"); //Implement Emoji And Add Its Emoji ID | Emoji = Gold
        var emoji4 = message.client.emojis.cache.get("796057305773899786"); //Implement Emoji And Add Its Emoji ID | Emoji = Diamond
        var emoji5 = message.client.emojis.cache.get("796057154645524522"); //Implement Emoji And Add Its Emoji ID | Emoji = Emerald

        const formatNumber = require('../../functions/regex');
        
        const cobble = Math.floor(Math.random() * 500)
        const iron = Math.floor(Math.random() * 250)
        const gold = Math.floor(Math.random() * 200)
        const diamond = Math.floor(Math.random() * 100)
        const emerald = Math.floor(Math.random() * 50)
        
        const sale1 = cobble * 1000;
        const sale2 = iron * 1800;
        const sale3 = gold * 2000; 
        const sale4 = diamond * 2500; 
        const sale5 = emerald * 3000; 
        const total = sale1 + sale2 + sale3 + sale4 + sale5;
        
        var output = await DB.GetCash(message.author.id)
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**You Went Mining And Mined:**`)
        .addFields(
            {name: `Cobblestone`, value: `${emoji1 || 'Add Emoji ID'} ${cobble}`, inline: true },
            {name: `Iron`, value: `${emoji2 || 'Add Emoji ID'} ${iron}`, inline: true },
            {name: `Gold`, value: `${emoji3 || 'Add Emoji ID'} ${gold}`, inline: true },
            {name: `Diamond`, value: `${emoji4 || 'Add Emoji ID'} ${diamond}`, inline: true },
            {name: `Emerald`, value: `${emoji5 || 'Add Emoji ID'} ${emerald}`, inline: true }
        )
        .addField(`You Sold Valuables!`, `And Made: **$${(formatNumber(total))}**\nYour Cash Balance Is Now: **$${(formatNumber(output.cash + total))}**`)
        DB.AddCash(message.author.id, total)
        message.channel.send(`**Mining.**`).then(msg => {
            setTimeout(function() {
                msg.edit(`**Mining..**`)
            }, 2000);
            setTimeout(function() {
                msg.edit(`**Mining...**`)
            }, 3000)
            setTimeout(function() {
                msg.edit(`**Mining.**`)
            }, 4000)
            setTimeout(function() {
                msg.edit(`**Mining..**`)
            }, 5000)
            setTimeout(function() {
                msg.edit(`**Mining...**`)
            }, 6000)
            setTimeout(function() {
                msg.edit(`<@${message.author.id}>`)
            }, 6500)
            setTimeout(function() {
                msg.edit(embed)
            }, 7000)
        })
        console.log(`${message.author.username} (Balance: $${(formatNumber(output.cash + total))})`)
        return;

    }
}
