const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const { quazId } = require('../../Data.json')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bug')
        .setDescription('Reports a bug with the bot.')
        .addStringOption(option => 
            option.setName('report')
            .setDescription('What is the bug you are experiencing?')
            .setRequired(true)),
    category: 'general',
    officerCommand: false,
    async execute(interaction, client) {
        const bugReport = interaction.options.getString('report')
        
        // Make embed with string from interaction
        const embed = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle(`__New Bug Reported By__: ${interaction.user.tag}`)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Bug:', value: `${bugReport}` }
        )

        // Send to my DM
        await client.users.send(quazId, { embeds: [embed] })

        // Reply that it was sent
        await interaction.reply({ content: 'Your report has been submitted', ephemeral: true })
    }
}