module.exports = {
    name: 'help',
    description: 'help module',
    aliases: [],
    cooldown: 5,
    async execute(message) {
        const { MessageEmbed } = require('discord.js');
        const { prefix } = require('../../config.json');
        const p = prefix

        const basic_commands = `\n● ${p}balance \`[@user]\`\n● ${p}pay \`<@user> <amount>\`\n● ${p}lb \`[@user]\``;
        const crate_commands = `\n● ${p}hourly\n● ${p}daily\n● ${p}booster\n● ${p}member`;
        const income_commands = `\n● ${p}beg\n● ${p}fish\n● ${p}work`;
        const luck_commands = `\n● ${p}rob \`<@user>\`\n● ${p}lotto \`<number 1-50>\`\n● ${p}dice \`<# 1-6> <bet>\`\n● ${p}slots \`<bet>\`\n● ${p}roulette \`<bet>\``;
        const other_commands = `\n● ${p}server`

        let pages = [`**\\⚙️ Basic Commands**${basic_commands}`, `**\\🧰 Crate Commands**${crate_commands}`, `**\\💰 Income Commands**${income_commands}`, `**\\🍀 Luck Commands**${luck_commands}`, `**\\❓ Other Commands**${other_commands}`];
        let page = 1;
        
        const embed2 = new MessageEmbed()
        .setColor('RED')

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`Page ${page} of ${pages.length} [] = optional | <> = required`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(pages[page-1])
        
        message.channel.send({embed}).then(msg => {
          msg.react('⬅️').then( r => {
            msg.react('⏹️')
            msg.react('➡️')
        
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
              stop.stop()
              forwards.stop()
              backwards.stop()
              msg.reactions.removeAll()
              return;
            })
          })
        })
    }
}