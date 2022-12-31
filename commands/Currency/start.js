const { SlashCommandBuilder } = require('discord.js')
const { User } = require('../../Database/Models/User')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Allows you to earn currency for talking.'),
    category: 'currency',
    async execute(interaction, client) {
        let idCheck = User.findOne({ where: { userId: interaction.user.id }})
        if (!(idCheck == null)) {
            return interaction.reply('You have already been added.')
        }

        let member = interaction.guild.members.cache.get(interaction.user.id)
        let memberName = interaction.user.username

        try {
            User.sync({ alter: true }).then(() => {
                return User.create({
                    userId: interaction.user.id,
                    userName: memberName,
                    userDisplayName: member.displayName
                })
            })

            interaction.reply('Added to database')
        } catch (error) {
            console.error(error)
        }
    }
}