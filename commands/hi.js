module.exports = {
    name: 'hi',
    description: 'Sends the word HI.',
    execute(message, args) {
        message.channel.send(`https://discord.com/api/oauth2/authorize?client_id=803416586282598441&permissions=8&scope=bot`);
    },
};