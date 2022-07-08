const Discord = require('discord.js')

module.exports = {
    name: 'events',
    description: 'Displays the events and the days',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#992D22')
        .setTitle('__DAILY EVENTS__')
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: 'Sunday: ', value: 'Demon Gates in Realm of Damnation'},
            {name: 'Monday:', value: 'Demon Gates in Realm of Damnation'},
            {name: 'Tuesday:', value: 'Haunted Carriage in Ashworld Cemetery'},
            {name: 'Wednesday:', value: 'Ancient Nightmare in Mount Zavain'},
            {name: 'Thursday:', value: 'Demon Gates in Realm of Damnation'},
            {name: 'Friday:', value: 'Ancient Nightmare in Mount Zavain'},
            {name: 'Saturday:', value: 'Haunted Carriage in Ashworld Cemetery'},
            {name: '\u200B', value: '\u200B'}
        )
        .setFooter({text: 'All event times are 12pm, 8:30pm and 10pm Server Time'})

        message.reply({embeds: [embed]})
    }
}