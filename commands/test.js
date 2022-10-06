const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command for new commands.'),
    category: 'testing',
    async execute(interaction, client) {
        const diabloImmortalIn = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('diabloImmortalIn')
            .setLabel('Click to add Diablo Immortal role!')
            .setStyle(ButtonStyle.Danger)
        )

        const diabloImmortalOut = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('diabloImmortalOut')
            .setLabel('Click to remove Diablo Immortal role!')
            .setStyle(ButtonStyle.Danger)
        )

        await interaction.reply({ content: 'Button Sent', ephemeral: true })
        await client.channels.cache.get('982389292619923456').send({ components: [diabloImmortalIn] })
        await client.channels.cache.get('996243464473821214').send({ components: [diabloImmortalOut] })
    }
}