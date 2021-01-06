module.exports = async (client, message) => {
    console.log(`Client Successfuly Connected`)
    client.user.setActivity(`Wok Economy`, { type: 'WATCHING' })
    const channel = client.channels.cache.get('795828320301482075');
    channel.join()
    setInterval(() => {
      client.user.setActivity(`Wok Economy`, { type: 'WATCHING' });
      console.log(`Updated Activity - ${new Date().toString().split(' ', 5).join(' ')}`);
    }, 600000);
}