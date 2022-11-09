const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('localtest')
        .setDescription('Displays the events and the days')
        .addBooleanOption(option =>
            option.setName('events')
            .setDescription('Do you want to view Ancient Arena times?')
            .setRequired(true)),
    category: 'main',
    async execute(interaction, client) {
        const bool = interaction.options.getBoolean('events')
        
        if (bool) {
            const embed = new EmbedBuilder()
            .setColor('#992D22')
            .setTitle('__Ancient Arena Schedule__')
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Sunday', value: '9:30pm Server Time'},
                {name: 'Tuesday', value: '9:30pm Server Time'},
                {name: 'Thursday', value: '9:30pm Server Time'},
                {name: 'Saturday', value: '9:30pm Server Time'}
            )
            console.log('Bool Worked')
            return await interaction.reply({ephemeral: true, embeds: [embed]})
        }

        /*const embed = new EmbedBuilder()
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

        await interaction.reply({ephemeral: true, embeds: [embed]})*/
    }
}