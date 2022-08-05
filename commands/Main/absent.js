const Discord = require('discord.js')

module.exports = {
    name: 'absent',
    description: 'Let\'s the Mystic Officers know of an absence from Diablo.',
    execute(message, args) {

        // Eventually update to allow better flow and more user friendly
            // Select or enter days/weeks (1W, 2D, etc.)
            // Enter reason for absence
        if (!args) {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Please enter the length of time you will be absent and a reason')

            return message.reply({ embeds: [embed] })
        } else if (!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Please enter the length of time you will be absent followed by the reason')
           
            return message.reply({ embeds: [embed] })
        }

        message.delete()

        // Send their message to the right channel and tag Mystic Officers
    }
}