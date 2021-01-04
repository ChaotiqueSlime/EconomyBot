const { prefix } = require('../config.json');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const prettyMilliseconds = require('pretty-ms');
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
  
if(message.author.bot) return;
if (!message.content.startsWith(prefix)) return;
if (message.channel.type == 'dm') return;

const args = message.content.substring(prefix.length).split(/ +/g);
const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

if (!command) return;

try {
    args.shift();
    if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
var timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if(timestamps.has(message.author.id)) {
const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

if(now < expirationTime) {
const timeLeft = (expirationTime - now) / 1000;
const exacttime = timeLeft.toFixed(0)

const embed = new MessageEmbed()
.setColor('RANDOM')
.setDescription(`You Have A Cooldown For \`\`${command.name}\`\``)
.addField('Time Left', prettyMilliseconds(parseInt(exacttime) * 1000, {verbose: true}), true);
return message.channel.send(embed).catch((err) => message.reply(`${err}`))
    }
}

timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
command.execute(message, args, client);
}

catch (error) {
    console.log(error);
    return message.channel.send('There Was An ERROR Executing This Command');
  }
};