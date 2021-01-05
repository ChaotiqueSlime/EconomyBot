module.exports = {
    name: '8ball',
    description: '8ball game',
    aliases: [],
    cooldown: 10,
    execute(message, args) {
        if(message.deletable) message.delete()

        const { MessageEmbed } = require('discord.js');
        const eightBall = require('../../functions/8ball');

        const askedQuestion = args.join(" ");

        if(!args[2]){return message.channel.send('Please ask a question first').then(m => m.delete({ timeout: 8000 }));}

        const embed = new MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL())
        .setTitle("\\🎱Ball Enchantress")
        .setDescription(`**Your Question:** ${askedQuestion}\n**My Calculation:** ${eightBall()}`)
        .setColor('RANDOM');

        return message.channel.send(embed);
    }
}