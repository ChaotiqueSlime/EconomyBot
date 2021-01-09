module.exports = {
    name: 'help',
    description: 'help module',
    aliases: [],
    cooldown: 60,
    async execute(message) {
        if(message.deletable) message.delete()
        const { MessageEmbed } = require('discord.js');
        const { prefix } = require('../../config.json');
        const p = prefix

        const number1 = `[3]`;
        const number2 = `[4]`
        const number3 = `[4]`
        const number4 = `[7]`
        const number5 = `[7]`
        const number6 = `[4]`

        const basic_commands = `\n● ${p}balance \`[@user]\`\n● ${p}pay \`<@user> <amount>\`\n● ${p}lb \`[@user]\``;
        const crate_commands = `\n● ${p}hourly\n● ${p}daily\n● ${p}booster\n● ${p}member`;
        const income_commands = `\n● ${p}beg\n● ${p}fish\n● ${p}work\n● ${p}mine`;
        const luck_commands = `\n● ${p}rob \`<@user>\`\n● ${p}lotto \`<number 1-50>\`\n● ${p}dice \`<# 1-6> <bet>\`\n● ${p}slots \`<bet>\`\n● ${p}roulette \`<bet>\`\n● ${p}highlow \`<bet>\`\n● ${p}blackjack \`<bet>\``;
        const other_commands = `\n● ${p}server\n● ${p}rps\n● ${p}8ball \`<question>\`\n● ${p}nickname \`<new name>\`\n● ${p}setcash \`<@user> <amount>\`\n● ${p}deluser \`<@user>\`\n● ${p}whois \`[@user or id]\``;
        const perk_commands = `\n● ${p}booster \`(you need to be a booster)\`\n● ${p}member \`(must have youtube member subscription)\`\n● ${p}nickname \`(must have youtube member subscription)\`\n● ${p}mine \`(must be a booster or youtube member)\``;

        const basic = `**\\⚙️ Basic Commands ${number1}**${basic_commands}`;
        const crate = `**\\🧰 Crate Commands ${number2}**${crate_commands}`;
        const income = `**\\💰 Income Commands ${number3}**${income_commands}`;
        const luck = `**\\🍀 Luck Commands ${number4}**${luck_commands}`;
        const other = `**\\❓ Other Commands ${number5}**${other_commands}`;
        const perk = `**\\💎 Perk Commands ${number6}**${perk_commands}`;

        let pages = [basic, crate, income, luck, other, perk];
        let page = 1;
        
        const embed2 = new MessageEmbed()
        .setColor('RED')

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`= { WornOffKeys Help Menu } =`, 'https://cdn.discordapp.com/attachments/795772613229412372/797312966659407872/638576603475214336.gif')
        .setFooter(`Page ${page} of ${pages.length} [] = optional | <> = required`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(pages[page-1])

        
        message.channel.send({embed}).then(msg => {
          msg.react('⬅️').then( r => {
            msg.react('⏹️')
            msg.react('➡️')

            function stopAll() {
              stop.stop()
              forwards.stop()
              backwards.stop()
              msg.reactions.removeAll()
              return;
            }

            setTimeout(() => {
              embed2.setDescription('\\⛔ Help Module Closed')
              msg.edit(embed2)
              stopAll()
            }, 60000);
        
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id
            const stopFilter = (reaction, user) => reaction.emoji.name === '⏹️' && user.id === message.author.id
        
            const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000})
            const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000})
            const stop = msg.createReactionCollector(stopFilter, {timer: 6000})
        
            backwards.on('collect', (r, u) => {
                if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                page--
                embed.setDescription(pages[page-1])
                embed.setFooter(`Page ${page} of ${pages.length} [] = optional | <> = required`)
                msg.edit(embed)
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
            })
        
            forwards.on('collect', (r, u) => {
                if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                page++
                embed.setDescription(pages[page-1])
                embed.setFooter(`Page ${page} of ${pages.length} [] = optional | <> = required`)
                msg.edit(embed)
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
            })

            stop.on('collect', (r, u) => {
              embed2.setDescription('\\⛔ Help Module Closed')
              r.users.remove(r.users.cache.filter(u => u === message.author).first())
              msg.edit(embed2)
              stopAll()
            })
          })
        })
    }
}