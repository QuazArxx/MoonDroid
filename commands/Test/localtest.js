const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('localtest')
        .setDescription('Local testing command')
        .addUserOption(options =>
            options.setName('target')
            .setDescription('Whose info do you want to view? Leave blank for your own info.')
            .setRequired(false)),
    category: 'main',
    officerCommand: false,
    async execute(interaction, client) {
        let target = interaction.options.getUser('target') || interaction.user

        let member = interaction.guild.members.cache.get(target.id)
        let joinDate = member.joinedAt
        const timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        let localDate = joinDate.toLocaleDateString(undefined, timeOptions)
        let localTime = joinDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

        const embed = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle(`"${interaction.guild.name}" Server Info for *__${member.displayName}__*`)
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .addFields(
            {name: '__Username__', value: `${member.displayName}`},
            {name: '__User Tag__', value: `${target.tag}`},
            {name: '__Discord ID__', value: `${target.id}`},
            {name: '__Joined Server__', value: `${localDate} at ${localTime} EST`},
            {name: '\u200B', value: '\u200B'}
        )
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        

        await interaction.reply({ embeds: [embed] })
    }
}