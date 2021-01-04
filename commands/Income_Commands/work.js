const DB = require('djs-economy');
const formatNumber = require('../../functions/regex')
module.exports = {
    name: 'work',
    description: 'work command',
    aliases: [],
    cooldown: 150,
    async execute(message) {
        if(message.deletable) message.delete()
        const check = await DB.GetCash(message.author.id)
        const work = DB.Work(100000, 300000, message.author.id);
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`You worked as a \`${work.job}\` and got paid $${formatNumber(work.cash)}\nYou now have $${formatNumber(check.cash + work.cash)}`);
        return message.channel.send(embed); 
    }
}