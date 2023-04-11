const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('targetinv')
        .setDescription('Allows admins to give or take items/money.'),
    category: 'admin',
    officerCommand: false,
    async execute(interaction, client) {
        console.log('This is working')
    }
}
