const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setreminder')
        .setDescription('Allows users to get a DM at a specific time that is set.'),
    category: 'main',
    async execute(interaction, client) {
        // Push reminders to an array to be stored

        // In index, check for date and time for specific reminder
    }
}