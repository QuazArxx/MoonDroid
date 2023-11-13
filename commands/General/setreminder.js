const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setreminder')
        .setDescription('Allows users to get a DM at a specific time that is set.')
        .addStringOption( option =>
            option.setName('hour')
            .setDescription('What hour of the day do you want to receive the reminder?')
            .setRequired(true)
            .addChoices(
                { name: '12am', value: 0 },
                { name: '1am', value: 1 },
                { name: '2am', value: 2 },
                { name: '3am', value: 3 },
                { name: '4am', value: 4 },
                { name: '5am', value: 5 },
                { name: '6am', value: 6 },
                { name: '7am', value: 7 },
                { name: '8am', value: 8 },
                { name: '9am', value: 9 },
                { name: '10am', value: 10 },
                { name: '11am', value: 11 },
                { name: '12pm', value: 12 },
                { name: '1pm', value: 13 },
                { name: '2pm', value: 14 },
                { name: '3pm', value: 15 },
                { name: '4pm', value: 16 },
                { name: '5pm', value: 17 },
                { name: '6pm', value: 18 },
                { name: '7pm', value: 19 },
                { name: '8pm', value: 20 },
                { name: '9pm', value: 21 },
                { name: '10pm', value: 22 },
                { name: '11pm', value: 23 }
            ))
        .addStringOption( option => 
            option.setName('day')
            .setDescription('What day do you want to receive the reminder?')
            .setRequired(true)
            .addChoices(
                { name: 'Sunday', value: 0 },
                { name: 'Monday', value: 1 },
                { name: 'Tuesday', value: 2 },
                { name: 'Wednesday', value: 3 },
                { name: 'Thursday', value: 4 },
                { name: 'Friday', value: 5 },
                { name: 'Saturday', value: 6 }
            ))
        .addStringOption( option =>
            option.setName('message')
            .setDescription('What would you like the reminder to say?')
            .setRequired(true)),
    category: 'testing',
    officerCommand: false,
    async execute(interaction, client) {
        let reminderHour = interaction.options.getString('hour')
        let reminderDay = interaction.options.getString('day')
        let reminderMessage = interaction.options.getString('message')

        let reminder = CronJob.from({
            cronTime: `0 0 ${reminderHour} * * ${reminderDay}`,
        
            onComplete: null,
            start: false
        })
    }
}