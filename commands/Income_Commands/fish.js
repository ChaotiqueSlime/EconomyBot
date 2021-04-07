const { MessageEmbed } = require('discord.js');
const DB = require('djs-economy');
module.exports = {
    name: 'fish',
    description: 'fish and sell',
    aliases: [],
    cooldown: 65,
    async execute(message) {
        if(message.deletable) message.delete()
        const formatNumber = require('../../functions/regex')
        
        const first = await DB.GetCash(message.author.id);
        
        console.log(`${message.author.username} First Timer Check: ${first.cash}`)
        
        const fish1 = Math.floor(Math.random() * 30) //Common Fish  :blowfish:
        const fish2 = Math.floor(Math.random() * 25) //Rare Fish   :fish: 
        const fish3 = Math.floor(Math.random() * 20) //Legendary Fish  :tropical_fish: 
        const fishsale1 = fish1 * 1500;
        const fishsale2 = fish2 * 1800;
        const fishsale3 = fish3 * 2000; 
        const total = fishsale1 + fishsale2 + fishsale3;
        
        var output = await DB.GetCash(message.author.id)
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**You Went Fishing And Caught:**`)
        .addFields(
            {name: `Common Fish`, value: fish1, inline: true },
            {name: `Rare Fish`, value: fish2, inline: true },
            {name: `Legendary Fish`, value: fish3, inline: true }
        )
        .addField(`You Sold Fish!`, `And Made **$${(formatNumber(total))}**\nYour Cash Balance Is Now **$${(formatNumber(output.cash + total))}**`)
        DB.AddCash(message.author.id, total)
        message.channel.send(`**Fishing.**`).then(msg => {
            setTimeout(function() {
                msg.edit(`**Fishing..**`)
            }, 2000);
            setTimeout(function() {
                msg.edit(`**Fishing...**`)
            }, 3000)
            setTimeout(function() {
                msg.edit(`**Fishing.**`)
            }, 4000)
            setTimeout(function() {
                msg.edit(`**Fishing..**`)
            }, 5000)
            setTimeout(function() {
                msg.edit(`**Fishing...**`)
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
