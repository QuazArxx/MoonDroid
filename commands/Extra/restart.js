const { SlashCommandBuilder } = require('discord.js')
const { quazId } = require('../../Data.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restarts the bot'),
    category: 'extra',
    officerCommand: false,
    async execute(interaction, client) {
        if (!(interaction.user.id == quazId)) return

        interaction.reply({ content: 'Restarting bot..', ephemeral: true })

        setTimeout(process.exit, 2000)
    }
}