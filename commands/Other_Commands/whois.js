module.exports = {
	name: 'whois',
	description: 'member info command',
	aliases: [],
	async execute(message) {
        const pm = require('pretty-ms');
		const { MessageEmbed } = require('discord.js');
		const userArray = message.content.split(' ');
		if (message.deletable) message.delete();
		const userArgs = userArray.slice(1);
		const member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(' ') || x.user.username === userArgs[0]) || message.member;

		if(member.presence.status === 'dnd') member.presence.status = '\\⛔ Do Not Disturb';
		if(member.presence.status === 'online') member.presence.status = '\\🟢 Online';
		if(member.presence.status === 'idle') member.presence.status = '\\🟠 Idle';
		if(member.presence.status === 'offline') member.presence.status = '\\🟣 Offline';

        const now = Date.now()
        const x = member.user.createdAt
        const z = member.user.createdTimestamp
        const y = message.guild.members.cache.get(member.id).joinedAt;
        const age = now - z
        const joined = now - y

        const status = member.presence.status;
        
        let memberinfo = `**Name - ${member.user.username} | <@${member.id}>\nID - ${member.id} | Discriminator - ${member.user.discriminator}\nStatus - ${status}**\n`;

		const userEmbed = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
            .setColor('RANDOM')
            .setDescription(`**__Member Info:__**\n${memberinfo}\n**Account Created - **\n\`${x}\`\n**Created - **\n\`${pm(age, {verbose: true})} Ago\`\n**Joined Server - **\n\`${y}\`\n**Joined - **\n\`${pm(joined, {verbose: true})} Ago\`\n`)
			.addField(`**__Roles:__**`, `<@&${member._roles.join('> <@&')}>`)
            .setFooter(`Guild: ${message.guild.name} • WornOffKeys.com`)
		return message.channel.send(userEmbed);
	},
};