const { MessageEmbed } = require('discord.js')
const DB = require('djs-economy')
module.exports = {
    name: "beg",
    description: "none",
    aliases: [],
    cooldown: 120,
    async execute(message) {
        if(message.deletable) message.delete()
        const formatNumber = require('../../functions/regex')

        const check = await DB.GetCash(message.author.id)
        const money = Math.floor(Math.random() * 300000);
        const money_two = `${(formatNumber(money))}`
        DB.AddCash(message.author.id, money)

        console.log(`${message.author.username} (Balance: $${(formatNumber(check.cash + money))})`)

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`**${message.author.username} Were Would You Like To Beg?**\n🇦 - NewYork\n🇧 - Las Angeles\n🇨 - Chicago\n🇩 - Boston\n🇪 - Seattle`)
        

        message.channel.send({embed}).then(msg => {
            msg.react('🇦').then( r => {
              msg.react('🇧')
              msg.react('🇨')
              msg.react('🇩')
              msg.react('🇪')

              setTimeout(() => {
                newyork.stop()
                lasangeles.stop()
                chicago.stop()
                boston.stop()
                seattle.stop()
                msg.reactions.removeAll()
                embed.setDescription(`**${message.author.username} Begged In NewYork City**\nAnd Made $${money_two} More Than Expected`)
                msg.edit(embed)
                return;
              }, 60000);

              const NewyorkFilter = (reaction, user) => reaction.emoji.name === '🇦' && user.id === message.author.id
              const LasAngelesFilter = (reaction, user) => reaction.emoji.name === '🇧' && user.id === message.author.id
              const ChicagoFilter = (reaction, user) => reaction.emoji.name === '🇨' && user.id === message.author.id
              const BostonFilter = (reaction, user) => reaction.emoji.name === '🇩' && user.id === message.author.id
              const SeattleFilter = (reaction, user) => reaction.emoji.name === '🇪' && user.id === message.author.id
          
              const newyork = msg.createReactionCollector(NewyorkFilter, {timer: 6000})
              const lasangeles = msg.createReactionCollector(LasAngelesFilter, {timer: 6000})
              const chicago = msg.createReactionCollector(ChicagoFilter, {timer: 6000})
              const boston = msg.createReactionCollector(BostonFilter, {timer: 6000})
              const seattle = msg.createReactionCollector(SeattleFilter, {timer: 6000})

              newyork.on('collect', (r, u) => {
                embed.setDescription(`**${message.author.username} Begged In NewYork City**\nAnd Made $${money_two} More Than Expected`)
                msg.edit(embed)
                msg.reactions.removeAll()
                newyork.stop()
                lasangeles.stop()
                chicago.stop()
                boston.stop()
                seattle.stop()
              })
              lasangeles.on('collect', (r, u) => {
                embed.setDescription(`**${message.author.username} Begged In Las Angeles**\nAnd Made $${money_two} More Than Expected`)
                msg.edit(embed)
                msg.reactions.removeAll()
                newyork.stop()
                lasangeles.stop()
                chicago.stop()
                boston.stop()
                seattle.stop()
              })
              chicago.on('collect', (r, u) => {
                embed.setDescription(`**${message.author.username} Begged In Chicago**\nAnd Made $${money_two} More Than Expected`)
                msg.edit(embed)
                msg.reactions.removeAll()
                newyork.stop()
                lasangeles.stop()
                chicago.stop()
                boston.stop()
                seattle.stop()
              })
              boston.on('collect', (r, u) => {
                embed.setDescription(`**${message.author.username} Begged In Boston**\nAnd Made $${money_two} More Than Expected`)
                msg.edit(embed)
                msg.reactions.removeAll()
                newyork.stop()
                lasangeles.stop()
                chicago.stop()
                boston.stop()
                seattle.stop()
              })
              seattle.on('collect', (r, u) => {
                embed.setDescription(`**${message.author.username} Begged In Seattle**\nAnd Made $${money_two} More Than Expected`)
                msg.edit(embed)
                msg.reactions.removeAll()
                newyork.stop()
                lasangeles.stop()
                chicago.stop()
                boston.stop()
                seattle.stop()
              })
            })
        })

    }
} 