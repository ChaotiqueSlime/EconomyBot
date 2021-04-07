const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nickname',
    description: 'nickname command',
    aliases: ['nick', 'name'],
    cooldown: 5,
    async execute(message, args) {
        if(message.deletable) message.delete()

        const BoostRole = message.guild.roles.cache.find(r => r.name === "Server Booster");

        let hasPermission = false;

        if(BoostRole){if(message.member.roles.cache.has(BoostRole.id)) hasPermission = true;}
        
        if (hasPermission) {
        const nickname = args.join(" ");

        if(!args[0]){return message.channel.send(`Your nickname cant be blank`).then(m => m.delete({ timeout: 8000 }));}
        if(args[5]){return message.channel.send(`Theres to many spaces in your nickname`).then(m => m.delete({ timeout: 8000 }));}

        const reason = `Nickname Member Perk`
        message.member.setNickname(`${nickname}`, reason);

        return message.channel.send(`<@${message.author.id}> Your Nickname Has Been Updated!, To - ${nickname}`);
        }
        const noAccess = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`You're not a YouTube Member ${message.author.username}`, 'https://cdn.discordapp.com/attachments/795772613229412372/797311043990323200/721107948092522617.gif');

        return message.channel.send(noAccess).then((msg) => {msg.delete({ timeout: 15000 })})
    }
}
