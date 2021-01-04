module.exports = {
    name: "rob",
    description: "A Theif Command",
    aliases: ['steal'],
    cooldown: 43200, 
    async execute(message) {
        const Discord = require('discord.js')
        const DB = require('djs-economy')
        const { prefix } = require('../../config.json')
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
      
      
        if (!member) {return message.reply('You Need To Rob Someone With @').then(m => m.delete({ timeout: 8000 }));}

        let innocent = await DB.GetCash(member.id)
        if(parseInt(innocent.cash) < 100000) {return message.reply(`${member.user.tag} Doesnt Have Enough To Be Robbed`).then(m => m.delete({ timeout: 8000 }));}
        let robable = innocent.cash / 5
        let test = Math.floor(Math.random() * robable)
        let yesno = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        let result = yesno[Math.floor(Math.random() * yesno.length )]
        const thishere = args[1]
        if (!thishere) {return message.reply('You Need To Rob Someone With @').then(m => m.delete({ timeout: 8000 }));}
        const fail = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} Tryed To Rob ${member.user.username}!`)
        .setDescription(`You Failed And Didnt Earn Anything`)
        .setColor(`#bf1143`)
        if(result === (`1`)) {return message.channel.send(fail).then(m => m.delete({ timeout: 8000 }));}
        if(result === (`8`)) {return message.channel.send(fail).then(m => m.delete({ timeout: 8000 }));}
        if(result === (`10`)) {return message.channel.send(fail).then(m => m.delete({ timeout: 8000 }));}
        DB.AddCash(message.author.id, test)
        DB.SubCash(member.id, test)
        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} Robbed ${member.user.username}!`)
        .setDescription(`You Robbed A Total Of :dollar: ${test}`)
        .setColor(`#39e695`)
        .setTimestamp()
        message.channel.send(embed);
        
    }
}