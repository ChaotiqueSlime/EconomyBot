const Discord = require('discord.js')
const DB = require('djs-economy')
module.exports = {
    name: "beg",
    description: "none",
    aliases: [],
    cooldown: 120,
    async execute(message) {
        if(message.deletable) message.delete()
        const formatNumber = require('../../functions/regex')
        const first = await DB.GetCash(message.author.id);
        console.log(`${message.author.username} First Timer Check: ${first.cash}`)
        const check = await DB.GetCash(message.author.id)
        const money = Math.floor(Math.random() * 300000);
        const money_two = `${(formatNumber(money))}`
        DB.AddCash(message.author.id, money)
        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} Begged For Money`)
        .setColor('RANDOM')
        .setDescription(`You begged for a total of $${money_two}`)
        console.log(`${message.author.username} (Balance: $${(formatNumber(check.cash + money))})`)
        return message.channel.send(embed);
        }
} 