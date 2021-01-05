module.exports = {
    name: 'nickname',
    description: 'nickname command',
    aliases: ['nick'],
    cooldown: 5,
    async execute(message, args) {
        if(message.deletable) message.delete()
        const role = message.guild.roles.cache.find(r => r.name === "Moderator");
        if(!message.member.roles.cache.has(role.id)) return;
        const nickname = args.join(" ");

        if(!args[0]){return message.channel.send(`Your nickname cant be blank`).then(m => m.delete({ timeout: 8000 }));}
        if(args[5]){return message.channel.send(`Theres to many spaces in your nickname`).then(m => m.delete({ timeout: 8000 }));}

        const reason = `Member Perk`
        message.member.setNickname(`${nickname}`, reason);

        return message.channel.send(`<@${message.author.id}> Your Nickname Has Been Updated!`);
    }
}