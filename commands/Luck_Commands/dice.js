const { MessageEmbed } = require('discord.js')
const formatNumber = require('../../functions/regex')
const DB = require('djs-economy')
module.exports = {
    name: 'dice',
    description: 'dice game',
    aliases: [],
    cooldown: 1,
    async execute(message, args) {
        let blacklist = ['-'];
        let foundInText = false;
        for (var i in blacklist) {
        if (message.content.toLocaleLowerCase().includes(blacklist[i].toLocaleLowerCase())) foundInText = true;
        }
        if (foundInText) {
        message.delete();
        {return message.channel.send('You Cannot Gamble Negative Money Moron').then(m => m.delete({ timeout: 8000 }));}
    }
    var roll = args[0]
    var amount = args[1]

  if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) {return message.reply('Specify the roll, it should be a number between 1-6').then(m => m.delete({ timeout: 8000 }));}
  if (!amount) {return message.reply('Specify the amount you want to gamble!').then(m => m.delete({ timeout: 8000 }));}
  var check = await DB.GetCash(message.author.id)
  if (check.cash < amount) {return message.reply('You Dont Have That Much Coins To Gamble').then(m => m.delete({ timeout: 8000 }));}
  const botdice = ['1', '2', '3', '4', '5', '6']
  const result = botdice[Math.floor(Math.random() * botdice.length )]
  if (parseInt(roll) === parseInt(result)) {
    const newbalance = amount * 10;
    DB.AddCash(message.author.id, newbalance)
  const embed = new MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`You Rolled A \`\`${args[0]}\`\`, The Dice Was \`\`${result}\`\`\nYou Won: ${formatNumber(newbalance)}\nYou Now Have: ${formatNumber(check.cash + newbalance)}`)
  .setTitle(`${message.author.username} Played Dice & Won!`)
  message.reply(embed)
  } else {
    const newbalance = amount;
    DB.SubCash(message.author.id, newbalance)
    const failbed = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`You Rolled A \`\`${args[0]}\`\`, The Dice Was \`\`${result}\`\`\nYou Now Have: ${formatNumber(check.cash - newbalance)}`)
    .setTitle(`${message.author.username} Played Dice & Lost!`)
    message.reply(failbed)
  }
    }
}