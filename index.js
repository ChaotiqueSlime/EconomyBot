const Discord = require('discord.js');
const client = new Discord.Client({ ws: { properties: { $browser: "Discord iOS" }} });
const handler = require('./handlers/commands.js')
const fs = require('fs');
const { token } = require('./config.json');
client.commands = new Discord.Collection();

handler(client) 

fs.readdir('./events', (err, files) => {
	if (err) return console.log(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});
client.login(token);