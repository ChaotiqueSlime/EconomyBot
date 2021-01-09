module.exports = {
    name: 'deluser',
    description: 'set someones cash',
    aliases: ['deleteuser'],
    cooldown: 1,
    async execute(message, args, client) {
        if(message.deletable) message.delete()

        const { MessageEmbed } = require('discord.js');
        const DB = require('djs-economy');

        const moderator = message.guild.roles.cache.find(r => r.name === "Moderator");
        if(moderator){if(!message.member.roles.cache.has(moderator.id)) return;}

        const channelID = `795792287456165898`;
        const logs = client.channels.cache.get(channelID);

        const userArray = message.content.split(' ');
        const userArgs = userArray.slice(1);

        const member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]);
    

        if(!member){return message.channel.send(`<@${message.author.id}> You Need To Ping Someone`).then(m => m.delete({ timeout: 8000 }));}

        DB.Delete(member.id)

        const embed = new MessageEmbed()
        .setDescription(`**Action:** Delete User\n**Mod:** \`${message.author.tag} (${message.author.id})\`\n**User:** \`${member.user.tag} (${member.id})\``);
        return logs.send(embed);
    }
}