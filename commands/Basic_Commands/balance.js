module.exports = {
    name: "balance",
    description: "Fetch's A Player Balance",
    aliases: ['bal', 'money'],
    cooldown: 5,
    async execute(message) {
        if(message.deletable) message.delete()
        const formatNumber = require('../../functions/regex')
        const DB = require('djs-economy');
        const Discord = require('discord.js');
        const userArray = message.content.split(' ');
        const userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const first = await DB.GetCash(member.id);
        console.log(`${member.user.username} First Timer Check: ${first.cash}`)
        const check = await DB.GetCash(member.id)
        const balance = `${(formatNumber(check.cash))}`;
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${member.user.username}'s Balance Info!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**Cash:**\n :dollar: ${balance}`);
        message.channel.send(embed)
        return;
    } 
} 