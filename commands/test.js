const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command for new commands.')
        .setDefaultMemberPermissions(0),
    category: 'testing',
    async execute(interaction, client) {
        const dreamerOptOut = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('dreamerOptOut')
            .setLabel('Click to remove the Dreamer role!')
            .setStyle(ButtonStyle.Primary)
        )

        await interaction.reply({ content: 'Button Sent', ephemeral: true })
        await interaction.channel.send({ components: [dreamerOptOut] })
    }
}