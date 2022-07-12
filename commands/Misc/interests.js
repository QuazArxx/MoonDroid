const Discord = require('discord.js');

module.exports = {
    name: 'interests',
    description: 'Sends the message for interests.',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#992D22')
        .setTitle('React with the emote below to opt in or out of MoonDroid event notifications.')

        message.delete()
        message.channel.send(embed).then(msg => {
            msg.react(':yes:672316905616572429')
            .catch(() => console.error('One of the emojis didn\'t work!'))
        });
    },
};