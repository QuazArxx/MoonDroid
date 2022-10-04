const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('Says hi back')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Time required')
                .setRequired(true)),
    category: 'extra',
    async execute(interaction, client) {
        await interaction.reply({ content: 'hi there!', ephemeral: true })
    }
}