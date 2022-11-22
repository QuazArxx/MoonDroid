const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: new SlashCommandBuilder()
        .setName('interests')
        .setDescription('Sends the message for interests.'),
    category: 'testing',
    officerCommand: true,
    async execute(interaction, client) {
        const firstRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('barbarian')
            .setLabel('Barbarian')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('crusader')
            .setLabel('Crusader')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('monk')
            .setLabel('Monk')
            .setStyle(ButtonStyle.Primary)
        )

        const secondRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('demonhunter')
            .setLabel('Demon Hunter')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('wizard')
            .setLabel('Wizard')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('necromancer')
            .setLabel('Necromancer')
            .setStyle(ButtonStyle.Primary)
        )

        const diabloNotif = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('diabloNotif')
            .setLabel('Click to opt in or out of Diablo notifications!')
            .setStyle(ButtonStyle.Primary)
        )

        await interaction.channel.send({ components: [diabloNotif] })
        await interaction.channel.send({ content: '**__Use the buttons below to add or remove class channels!__**', components: [firstRow, secondRow] })
        await interaction.reply({ content: 'Buttons Sent', ephemeral: true })
    }
}