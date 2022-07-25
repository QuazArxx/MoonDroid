const Discord = require('discord.js');

module.exports = {
    name: 'interests',
    description: 'Sends the message for interests.',
    execute(message, args) {
        message.delete()
        const embed = new Discord.MessageEmbed()
        .setColor('#992D22')
        .setTitle('Use the reactions below to get access to Diablo Class chats!')
        .addFields(
            {name: 'Barbarian Channel: [Barbarian Emote]', value: '\u200B'},
            {name: 'Crusader Channel: [Crusader Emote]', value: '\u200B'},
            {name: 'Monk Channel: [Monk Emote]', value: '\u200B'},
            {name: 'Demon Hunter Channel: [Demon Hunter Emote]', value: '\u200B'},
            {name: 'Wizard Channel: [Wizard Emote]', value: '\u200B'},
            {name: 'Necromancer Channel: [Necromancer Emote]', value: '\u200B'}
        )

        message.channel.send({ embeds: [embed] }).then(msg => {
            msg.react('[Barbarian Emote]')
            .then(() => msg.react('[Crusader Emote]'))
            .then(() => msg.react('[Monk Emote]'))
            .then(() => msg.react('[Demon Hunter Emote]'))
            .then(() => msg.react('[Wizard Emote]'))
            .then(() => msg.react('[Necromancer Emote]'))
            .catch(() => console.error('One of the emojis didn\'t work!'))
        })
    }
}