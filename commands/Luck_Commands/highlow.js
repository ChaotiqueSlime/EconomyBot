const Discord = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = {
    name: "highlow",
    description: "guess the number to win",
    aliases: ['hl'],
    cooldown: 0,
    async execute(message) {
        const args = message.content.slice(prefix.length).trim().split(/ /g);
        const userBet = args[1];
        console.log(userBet)
        if (!userBet) return message.reply(`Invalid Syntax! ${prefix}hl <bet>`).then(m => m.delete({ timeout: 8000 }));
        if (isNaN(userBet)) return message.reply(`Invalid Syntax! ${prefix}hl <bet>\nBet must be a number`).then(m => m.delete({ timeout: 8000 }));
        if (userBet < 10000) return message.reply(`Invalid Syntax! ${prefix}hl <bet>\nBet must be more than $10,000`).then(m => m.delete({ timeout: 8000 }));
        if (userBet > 135000) return message.reply(`Invalid Syntax! ${prefix}hl <bet>\nBet must be less than $135,000`).then(m => m.delete({ timeout: 8000 }));

        const DB = require('djs-economy');
        const origMoney = await DB.GetCash(message.author.id);
        if (origMoney < userBet) return message.reply(`Invalid Syntax! ${prefix}hl <bet>\nBet must be less than your current cash amount`).then(m => m.delete({ timeout: 8000 }));

        const number = Math.floor(Math.random() * (70 - 1) + 1);
        console.log(number)
        let tries = 5;

        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.member.displayName}'s highlow game`)
        .setDescription(`The number has been selected, it can be anywhere from 1 - 70. You have 5 tries to guess the correct number`)

        const gameMessage = await message.channel.send(embed);
        
        const gameFilter = m => m.author.id === message.author.id;
        
        const collector = message.channel.createMessageCollector(gameFilter, { time: 300000 });

        const formatNumber = require('../../functions/regex');

        collector.on('collect', async msg => {
            if (isNaN(parseInt(msg.content))) return message.channel.send(`guess must be a number \`${tries}/5\``);
            if (parseInt(msg.content) === number) {
                const reward = userBet * 3.75;
                DB.AddCash(msg.author.id, reward);
                const newBal = await DB.GetCash(message.author.id);
                collector.stop();
                const embed = new Discord.MessageEmbed()
                .setTitle(`${message.member.displayName}'s highlow game`)
                .setDescription(`Good job! you guessed the number and won $${formatNumber(reward)}. Your new cash amount is ${formatNumber(newBal.cash)}`)
                return gameMessage.edit(embed);
            } else if (parseInt(msg.content) < number) {
                tries -= 1;
                if (tries <= 0) {
                    collector.stop();
                    DB.SubCash(message.author.id, userBet)
                    const newBal = await DB.GetCash(message.author.id);
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.member.displayName}'s highlow game`)
                    .setDescription(`You failed to guess ${number} and lost $${formatNumber(userBet)}. Your new cash amount is ${formatNumber(newBal.cash)}`)
                    gameMessage.edit(embed);
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.member.displayName}'s highlow game`)
                    .setDescription(`The number is higher than your guess. \`${tries}/5\``)
                    return gameMessage.edit(embed);
                }
            } else if (parseInt(msg.content) > number) {
                tries -= 1;
                if (tries <= 0) {
                    collector.stop();
                    DB.SubCash(message.author.id, userBet);
                    const newBal = await DB.GetCash(message.author.id);
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.member.displayName}'s highlow game`)
                    .setDescription(`You failed to guess ${number} and lost $${formatNumber(userBet)}. Your new cash amount is ${formatNumber(newBal.cash)}`)
                    gameMessage.edit(embed);
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.member.displayName}'s highlow game`)
                    .setDescription(`The number is lower than your guess. \`${tries}/5\``)
                    return gameMessage.edit(embed);
                }
            }
            
        });


    }
};