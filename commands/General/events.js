const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('events')
        .setDescription('Displays the event schedules. Choose to view the Arena schedule.')
        .addBooleanOption(option =>
            option.setName('arena')
            .setDescription('Do you want to view Ancient Arena times?')
            .setRequired(true)),
    category: 'general',
    officerCommand: true,
    async execute(interaction, client) {
        const bool = interaction.options.getBoolean('arena')
        
        if (bool) {
            const embedded = new EmbedBuilder()
            .setColor('#992D22')
            .setTitle('__Ancient Arena Schedule__')
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Sunday, Tuesday, Thursday, Saturday:', value: '9:30pm Server Time'}
            )
            return await interaction.reply({ephemeral: true, embeds: [embedded]})
        }

        const embed = new EmbedBuilder()
        .setColor('#992D22')
        .setTitle('__DAILY EVENTS__')
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: 'Sunday: ', value: 'Onslaught in Stormpoint Keep'},
            {name: 'Monday:', value: 'Demon Gates in Realm of Damnation'},
            {name: 'Tuesday:', value: 'Haunted Carriage in Ashworld Cemetery'},
            {name: 'Wednesday:', value: 'Ancient Nightmare in Mount Zavain'},
            {name: 'Thursday:', value: 'Onslaught in Stormpoint Keep'},
            {name: 'Friday:', value: 'Ancient Nightmare in Mount Zavain'},
            {name: 'Saturday:', value: 'Haunted Carriage in Ashworld Cemetery'},
            {name: '\u200B', value: '\u200B'},
            {name: 'Wrathborne Invasion is every day 12:30pm and 9pm', value: '\u200B'}
        )
        .setFooter({text: 'Daily event times are 12pm, 8:30pm, and 10pm Server Time'})

        await interaction.reply({ ephemeral: true, embeds: [embed] })
    }
}