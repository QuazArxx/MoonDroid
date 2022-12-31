const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Removes messages depending on the amount entered')
        .setDefaultMemberPermissions(0)
        .addIntegerOption(option => 
            option.setName('messages')
            .setDescription('Input the number of messages to delete.')
            .setRequired(true)),
    category: 'admin',
    officerCommand: true,
    async execute(interaction, client) {
        const amount = interaction.options.getInteger('messages')

        interaction.channel.bulkDelete(amount, true).catch(err => {
            console.error(err)
            return interaction.reply({ content: 'There was an error trying to delete messages in this channel!', ephemeral: true })
        })

        interaction.reply({ content: 'Messages successfully deleted!', ephemeral: true })
    }
}