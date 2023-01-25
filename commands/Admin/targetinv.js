const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('targetinv')
        .setDescription('Allows admins to give or take items/money.')
        .addUserOption( option =>
            option.setName('target')
            .setDescription('User whose inventory you want to change.')
            .setRequired(true))
        .addStringOption( option =>
            option.setName('type')
            .setDescription('Item or currency')
            .addChoices)        
}
