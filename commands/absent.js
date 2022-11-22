const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('absent')
        .setDescription("Lets the Mystic Officers know of an absence from Diablo.")
        .addStringOption(option => 
            option.setName('time')
                .setDescription('Say the amount of time you will be gone for.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Give a reason (OPTIONAL).')
                .setRequired(false)),
    category: 'main',
    officerCommand: false,
    async execute(interaction, client) {
        // Send their message to the right channel and tag Mystic Officers
        interaction.reply({ content: `Thank you for your submission. Mystic Officers have been notified of your expected absence.`, ephemeral: true })

        const input = interaction.options.getString('time')
        let reason = interaction.options.getString('reason') ?? 'No reason given'
        
        const embed = new EmbedBuilder()
        .setColor('#992D22')
        .setTitle(`__New Temporary Leave of Absence Has Been Submitted__`)
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: `Length of Time: ${input}`, value: `Reason: ${reason}`},
            {name: '\u200B', value: '\u200B'}
        )
        .setFooter({ text: `Submitted by ${interaction.user.username}`, iconURL: null })
        .setTimestamp()

        client.channels.cache.get('1002358788583591968').send('<@&995039357025124452>')
        client.channels.cache.get('1002358788583591968').send({ embeds: [embed] })
    }
}