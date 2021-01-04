module.exports = {
    name: "leaderboard",
    description: "A Economy Leaderboard",
    aliases: ['lb', 'top'],
    cooldown: 5,
    async execute(message) {
        if(message.deletable) message.delete()
        const { prefix } = require('../../config.json');
        const djs = require('djs-economy');
        const Discord = require('discord.js');
        const { client } = message
        const userArray = message.content.split(' ');
        const userArgs = userArray.slice(1);
        const member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(' ') || x.user.username === userArgs[0]) || message.member;
        const formatNumber = require('../../functions/regex')
        var output = await djs.Leaderboard({
            filter: x => x.cash > 50,
            search: member.id})
        if (message.mentions.users.first()) {
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**${member.user.tag}** Is **#${output}** On The Leaderboard!`);
        message.channel.send(embed);
        } else {
        djs.Leaderboard({
          limit: 10,
          filter: x => x.cash > 50
        }).then(async users => {
        if(users[0]) var firstplace = await client.users.fetch(users[0].userid) 
        if(users[1]) var secondplace = await client.users.fetch(users[1].userid)
        if(users[2]) var thirdplace = await client.users.fetch(users[2].userid)
        if(users[3]) var fourthplace = await client.users.fetch(users[3].userid)
        if(users[4]) var fifthplace = await client.users.fetch(users[4].userid)
        if(users[5]) var sixthplace = await client.users.fetch(users[5].userid)
        if(users[6]) var seventhplace = await client.users.fetch(users[6].userid)
        if(users[7]) var eighthplace = await client.users.fetch(users[7].userid)
        if(users[8]) var ninthplace = await client.users.fetch(users[8].userid)
        if(users[9]) var tenthplace = await client.users.fetch(users[9].userid)

        const resultEmbed = new Discord.MessageEmbed()
        .addField(`Top Richest Players:`, `\\🥇 ${firstplace && firstplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[0] && users[0].cash || 'None'}
\\🥈 ${secondplace && secondplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[1] && users[1].cash || 'None'}
\\🥉 ${thirdplace && thirdplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[2] && users[2].cash || 'None'}
\\🏅 ${fourthplace && fourthplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[3] && users[3].cash || 'None'}
\\🏅 ${fifthplace && fifthplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[4] && users[4].cash || 'None'}
\\🏅 ${sixthplace && sixthplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[5] && users[5].cash || 'None'}
\\🏅 ${seventhplace && seventhplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[6] && users[6].cash || 'None'}
\\🏅 ${eighthplace && eighthplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[7] && users[7].cash || 'None'}
\\🏅 ${ninthplace && ninthplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[8] && users[8].cash || 'None'}
\\🏅 ${tenthplace && tenthplace.tag || 'Nobody Yet'} ⟶  \\💵 ${users[9] && users[9].cash || 'None'}\n
**<@${member.user.id}> Your Ranking #${output}**`)
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .setFooter(`${prefix}lb @someone to see what rank they are`)
        message.channel.send(resultEmbed)})}
    }
}