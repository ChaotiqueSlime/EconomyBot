module.exports = {
    name: "pay",
    description: "A Pay Command For Economy",
    aliases: ['transfer'],
    cooldown: 5,
    async execute(message) {
        const DB = require('djs-economy')
        const Discord = require('discord.js')
        const { prefix } = require('../../config.json')
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let blacklist = ['-'];
        let foundInText = false;
        for (var i in blacklist) {
          if (message.content.toLocaleLowerCase().includes(blacklist[i].toLocaleLowerCase())) foundInText = true;
        }
        if (foundInText) {
          message.delete();
           {return message.channel.send('You Cant Give Negative Money').then(m => m.delete({ timeout: 8000 }));}
          }
    
        var user = message.mentions.users.first()
        var amount = args[2]
      
        if (!user) {return message.reply('@ the person you wanna pay first').then(m => m.delete({ timeout: 8000 }));}
        if (!amount) {return message.reply('Specify the amount you want to pay!').then(m => m.delete({ timeout: 8000 }));}
      
        var output = await DB.GetCash(message.author.id)
        const ERR = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`<@${message.author.id}> You have less cash than the amount \n you want to pay`)
        if (output.cash < amount) {return message.channel.send(ERR).then(m => m.delete({ timeout: 8000 }));}

        DB.SubCash(message.author.id, amount)
        DB.AddCash(user.id, amount)

        const sender = await DB.GetCash(message.author.id)
        const receiver = await DB.GetCash(user.id)

        const formatNumber = require('../../functions/regex')

        const succ = new Discord.MessageEmbed()
        .setTitle(`:money_with_wings: Payment Transferred!`)
        .setColor('RANDOM')
        .setDescription(`You Paid ${user.tag} Your New Balance Is\n :dollar: ${(formatNumber(sender.cash))}`);
        console.log(`${message.author.username} (Balance: $${(formatNumber(sender.cash))})`)
        console.log(`${user.username} (Balance: $${(formatNumber(receiver.cash))})`)
        return message.channel.send(succ);
    }
}