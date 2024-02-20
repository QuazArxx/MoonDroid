const { SlashCommandBuilder } = require('discord.js')
const fs = require('node:fs')

const user = require('../../users.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Allows you to earn currency for talking.'),
    category: 'currency',
    officerCommand: false,
    async execute(interaction, client) {
        const member = interaction.user

        user.push({
            userId: member.id,
            userName: member.displayName,
            userCurrencyAmount: 0
        })
    }
}