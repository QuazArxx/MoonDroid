const Discord = require('discord.js');

const { prefix } = require('../../config.json');
const colors = require('../../colors.json');

module.exports = {
    name: 'submit',
    description: 'Allows users to submit links for videos',
    execute(message, args) {
        args = message.content.slice(prefix.length).split(' ');

        const error1 = new Discord.MessageEmbed()
        .setColor(colors.red)
        .setThumbnail('https://w7.pngwing.com/pngs/72/540/png-transparent-no-symbol-sign-sign-stop-miscellaneous-angle-text-thumbnail.png')
        .setTitle('You can\'t submit nothing! Please provide a link.')

        if (!args[1]) {
            message.delete();
            return message.channel.send(error1);
        }
        message.channel.send(error1);
    }
}