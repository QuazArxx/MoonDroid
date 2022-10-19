const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command for new commands.'),
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
<<<<<<< HEAD
        await interaction.channel.send({ components: [dreamerOptOut] })
=======
        await client.channels.cache.get('1029900606065877012').send({ components: [diabloImmortalIn] })
        await client.channels.cache.get('996243464473821214').send({ components: [diabloImmortalOut] })
>>>>>>> 54a6e4cdb3b12ce1dd62e1a9d21bc18e2add8a23
    }
}