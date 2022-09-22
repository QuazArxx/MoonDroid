const Discord = require('discord.js');

module.exports = {
    name: 'interests',
    description: 'Sends the message for interests.',
    execute(message, args, client) {
        message.delete()
        const embed = new Discord.MessageEmbed()
        .setColor('#992D22')
        .setTitle('Use the reactions below to get access to different parts of the server!')
        .addFields(
            {name: 'Barbarian Channel: <:barbarians:1001300617127538798>', value: '\u200B'},
            {name: 'Crusader Channel: <:crusader:1001300619300192256>', value: '\u200B'},
            {name: 'Monk Channel: <:monk:1001300623100235838>', value: '\u200B'},
            {name: 'Demon Hunter Channel: <:demonhunter:1001300621305065492>', value: '\u200B'},
            {name: 'Wizard Channel: <:wizard:1001300626220789801>', value: '\u200B'},
            {name: 'Necromancer Channel: <:necromancer:1001300624509509724>', value: '\u200B'}
        )

        message.channel.send({ embeds: [embed] }).then(msg => {
            msg.react('<:barbarians:1001300617127538798>')
            .then(() => msg.react('<:crusader:1001300619300192256>'))
            .then(() => msg.react('<:monk:1001300623100235838>'))
            .then(() => msg.react('<:demonhunter:1001300621305065492>'))
            .then(() => msg.react('<:wizard:1001300626220789801>'))
            .then(() => msg.react('<:necromancer:1001300624509509724>'))
            .catch(() => console.error('One of the emojis didn\'t work!'))
        })
    }
}