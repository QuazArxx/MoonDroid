const { SlashCommandBuilder } = require('discord.js')

const data = require('../Data.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spy')
        .setDescription('Changes the user to a Diablo Spy')
        .addUserOption(options =>
            options.setName('target')
            .setDescription('User to make spy')
            .setRequired(true)),
    category: 'admin',
    officerCommand: true,
    async execute(interaction, client) {
        let target = interaction.options.getUser('target')

        if (target.roles.cache.has(data.diabloSpyRole)) return interaction.reply({ content: 'That user is already a spy!', ephemeral: true })

        if (target.roles.cache.has(data.diabloImmortalRole)) {
            target.roles.remove(data.diabloImmortalRole)
        }

        await target.roles.add(data.diabloSpyRole)

        await interaction.reply({ content: `${target} has been made a spy`, ephemeral: true })
    }
}