const Discord = require('discord.js')

module.exports = {
    name: 'absent',
    description: 'Let\'s the Mystic Officers know of an absence from Diablo.',
    execute(message, args, client) {

        // Eventually update to allow better flow and more user friendly
            // Select or enter days/weeks (1W, 2D, etc.)
            // Enter reason for absence
        if (!args.length) {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Please enter the length of time you will be absent and a reason(optional).')

            return message.reply({ embeds: [embed] })
        } else if (args[0] == ' ' || args[1] == ' ') {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Please check spacing between words. There may be 1 too many spaces.')

            return message.reply({ embeds: [embed] })
        } else if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Please enter the length of time you will be absent followed by the reason(optional).')
           
            return message.reply({ embeds: [embed] })
        }

        message.delete()

        let reason

        if (!args[1]) {
            reason = 'None Given by User'
        } else {
            reason = message.content.replace(`!absent ${args[0]}`, '')
        }

        // Send their message to the right channel and tag Mystic Officers
        message.channel.send(`Thank you for your submission, ${message.author}. Mystic Officers have been notified of your expected absence.`)

        const embed = new Discord.MessageEmbed()
        .setColor('#992D22')
        .setTitle(`__New Temporary Leave of Absence Has Been Submitted__`)
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: `Length of Time: ${args[0]}`, value: `Reason: ${reason}`},
            {name: '\u200B', value: '\u200B'}
        )
        .setFooter({ text: `Submitted by ${message.author.username}`, iconURL: null })
        .setTimestamp()

        client.channels.cache.get('1002358788583591968').send('<@&995039357025124452>')
        client.channels.cache.get('1002358788583591968').send({ embeds: [embed] })
    }
}