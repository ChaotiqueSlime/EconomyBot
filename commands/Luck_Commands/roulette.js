const { MessageEmbed } = require('discord.js');
const DB = require('djs-economy');
const formatNumber = require('../../functions/regex')
module.exports = {
    name: 'roulette',
    description: 'roulette game',
    aliases: ['rl'],
    cooldown: 5,
    async execute(message, args) {

        if(message.deletable) message.delete()

        if(!parseInt(args[0])){return message.channel.send(`<@${message.author.id}> Your Bet Is Not A Number`).then(m => m.delete({ timeout: 8000 }));}
        const bet = Math.abs(args[0]);

        const check = await DB.GetCash(message.author.id)

        if(check.cash <= bet){return message.channel.send(`<@${message.author.id}> You Dont Have That Much Money`).then(m => m.delete({ timeout: 8000 }));}

        DB.SubCash(message.author.id, bet)

        let colorss = ['🔴', '🔵', '🟢', '🟠', '🟡']
        const botroll = colorss[Math.floor(Math.random() * colorss.length )]

        const embed = new MessageEmbed()
        .setDescription(`<@${message.author.id}> Pick An Emoji Each One Has A Diffrent Multiplier\nYour Bet: $${formatNumber(bet)}`)
        .setThumbnail(message.author.displayAvatarURL())
        .setColor('RANDOM');

        const redFilter = (reaction, user) => reaction.emoji.name === '🔴' && user.id === message.author.id;
        const blueFilter = (reaction, user) => reaction.emoji.name === '🔵' && user.id === message.author.id;
        const greenFilter = (reaction, user) => reaction.emoji.name === '🟢' && user.id === message.author.id;
        const orangeFilter = (reaction, user) => reaction.emoji.name === '🟠' && user.id === message.author.id;
        const yellowFilter = (reaction, user) => reaction.emoji.name === '🟡' && user.id === message.author.id;

        message.channel.send({embed}).then(msg => {
            msg.react('🔴').then( r => {
              msg.react('🔵')
              msg.react('🟢')
              msg.react('🟠')
              msg.react('🟡')

        const red = msg.createReactionCollector(redFilter, {timer: 6000});
        const blue = msg.createReactionCollector(blueFilter, {timer: 6000});
        const green = msg.createReactionCollector(greenFilter, {timer: 6000});
        const orange = msg.createReactionCollector(orangeFilter, {timer: 6000});
        const yellow = msg.createReactionCollector(yellowFilter, {timer: 6000});

        const redbet = Math.round(bet * 1.5);
        const bluebet = Math.round(bet * 2);
        const greenbet = Math.round(bet * 2.5);
        const orangebet = Math.round(bet * 3);
        const yellowbet = Math.round(bet * 3.5);


        red.on('collect', (r, u) => {
        if(botroll === '🔴') {
            embed.setDescription(`You Won 1.5x Your Bet: $${redbet}\nYou Now Have: $${formatNumber(check.cash - bet + redbet)}`)
            msg.edit(embed)
            DB.AddCash(message.author.id, redbet)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        } else {
            embed.setDescription(`You Lost Your Bet! Color Was: \\${botroll}\nYou Now Have: $${formatNumber(check.cash - bet)}`)
            msg.edit(embed)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        }})
        blue.on('collect', (r, u) => {
            if(botroll === '🔵') {
            embed.setDescription(`You Won 2x Your Bet: $${bluebet}\nYou Now Have: $${formatNumber(check.cash - bet + bluebet)}`)
            msg.edit(embed)
            DB.AddCash(message.author.id, bluebet)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        } else {
            embed.setDescription(`You Lost Your Bet! Color Was: \\${botroll}\nYou Now Have: $${formatNumber(check.cash - bet)}`)
            msg.edit(embed)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        }})
        green.on('collect', (r, u) => {
            if(botroll === '🟢') {
            embed.setDescription(`You Won 2.5x Your Bet: $${greenbet}\nYou Now Have: $${formatNumber(check.cash - bet + greenbet)}`)
            msg.edit(embed)
            DB.AddCash(message.author.id, greenbet)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        } else {
            embed.setDescription(`You Lost Your Bet! Color Was: \\${botroll}\nYou Now Have: $${formatNumber(check.cash - bet)}`)
            msg.edit(embed)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        }})
        orange.on('collect', (r, u) => {
            if(botroll === '🟠') {
            embed.setDescription(`You Won 3x Your Bet: $${orangebet}\nYou Now Have: $${formatNumber(check.cash - bet + orangebet)}`)
            msg.edit(embed)
            DB.AddCash(message.author.id, orangebet)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        } else {
            embed.setDescription(`You Lost Your Bet! Color Was: \\${botroll}\nYou Now Have: $${formatNumber(check.cash - bet)}`)
            msg.edit(embed)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        }})
        yellow.on('collect', (r, u) => {
            if(botroll === '🟡') {
            embed.setDescription(`You Won 3.5x Your Bet: $${yellowbet}\nYou Now Have: $${formatNumber(check.cash - bet + yellowbet)}`)
            msg.edit(embed)
            DB.AddCash(message.author.id, yellowbet)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        } else {
            embed.setDescription(`You Lost Your Bet! Color Was: \\${botroll}\nYou Now Have: $${formatNumber(check.cash - bet)}`)
            msg.edit(embed)
            msg.reactions.removeAll()
            red.stop()
            blue.stop()
            green.stop()
            orange.stop()
            yellow.stop()
            return;
        }})
    })
})}}