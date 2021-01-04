const { prefix } = require('../../config.json')
module.exports = {
    name: "megapot",
    description: "lottery",
    aliases: ['lotto', 'lottery'],
    cooldown: 30,
    async execute(message) {
        if(message.deletable) message.delete()
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const userRoll = args[1]
        if (!userRoll) {return message.reply(`Invalid Syntax! ${prefix}lotto <number>`).then(m => m.delete({ timeout: 8000 }));}
        const DB = require('djs-economy')
        const first = await DB.GetCash(message.author.id);
        console.log(`${message.author.username} First Timer Check: ${first.cash}`)
        var output = await DB.GetCash(message.author.id)
        const Discord = require('discord.js')
        const botRoll = Math.floor(Math.random() * 50)
        if (output.cash < 75001) {return message.channel.send(`You Don't Have 75k To Use This Command`).then(m => m.delete({ timeout: 8000 }));}
        if (parseInt(userRoll) !== parseInt(botRoll)) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} Tested His Lottery Luck!`)
        .setColor('#bf1143')
        .setDescription(`You Guessed \`\`${userRoll}\`\`\nThe Number Was \`\`${botRoll}\`\`\nYour Result: \`\`LOST\`\``)
        message.channel.send(embed)
        DB.SubCash(message.author.id, 75000)
        } else {
        DB.SubCash(message.author.id, 75000)
        DB.AddCash(message.author.id, 50000000)
        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} Tested His Lottery Luck!`)
        .setColor('#39e695')
        .setDescription(`You Guessed \`\`${userRoll}\`\`\nThe Number Was \`\`${botRoll}\`\`\nYour Result: \`\`Won\`\``)
        .addField(`I Added 50Mil To Your Account`, `:dollar: 50,000,000\nYou Now Have :dollar: ${output.cash + 49925000}`)
        message.channel.send(embed)
        }

    }
}