const { readdirSync } = require("fs");
module.exports = (client) => {
  readdirSync("./commands/").map((dir) => {
    const commands = readdirSync(`./commands/${dir}/`).map((cmd) => {
      let pull = require(`../commands/${dir}/${cmd}`);
      console.log(`${pull.name} Command Loaded`);
      client.commands.set(pull.name, pull);
    });
  });
};