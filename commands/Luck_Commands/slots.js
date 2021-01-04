const { MessageEmbed } = require('discord.js')
const formatNumber = require('../../functions/regex')
const DB = require('djs-economy');
module.exports = {
    name: 'slots',
    description: 'slots command',
    aliases: ['slot'],
    cooldown: 5,
    async execute(message, args) {
    if(message.deletable) message.delete()
    let slots = ["\\🍒", "\\🍓", "\\🍎"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let icon = message.author.displayAvatarURL();
    const gamble = args[0]

    
    if(!gamble){return message.channel.send(`You Need To Place A Bet <@${message.author.id}>`).then(m => m.delete({ timeout: 8000 }));}
    if(!parseInt(gamble)){return message.channel.send(`Your Bet Needs To Be A Number <@${message.author.id}>`).then(m => m.delete({ timeout: 8000 }));}

    const bet = Math.abs(gamble);

    const win = bet * 3;

    DB.SubCash(message.author.id, bet)
    const check = await DB.GetCash(message.author.id)
      
    if(result1 === result2 && result1 === result3) {
        let embed = new MessageEmbed()
        .setThumbnail(icon)
        .setTitle('\\🎰 Slots \\🎰')
        .setDescription(`Machine: **|**${slots[result1]} **|** ${slots[result2]} **|** ${slots[result3]}**|**\nYou Won: $${formatNumber(win)}\nYou Have: $${formatNumber(check.cash + win)}`)
        .setColor('RANDOM');
        DB.AddCash(message.author.id, win)
        return message.channel.send(embed);
      
    } else {
        let embed2 = new MessageEmbed()
        .setThumbnail(icon)
        .setTitle('\\🎰 Slots \\🎰')
        .setDescription(`Machine: **|**${slots[result1]} **|** ${slots[result2]} **|** ${slots[result3]}**|**\nYour Lost: $${formatNumber(bet)}\nYou Have: $${formatNumber(check.cash)}`)
        .setColor('RANDOM');
        return message.channel.send(embed2);

        }
    }
}