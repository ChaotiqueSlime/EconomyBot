module.exports = async (client, message) => {
    console.log(`Client Logged On!`)
    client.user.setActivity(`Economy`, { type: 'WATCHING' })

    setInterval(() => {
      client.user.setActivity(`Economy`, { type: 'WATCHING' });
    }, 600000);
}
