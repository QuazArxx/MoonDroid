const { SlashCommandBuilder } = require('discord.js')
const { User } = require('../../Database/Models/User')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Allows you to earn currency for talking.'),
    category: 'currency',
    officerCommand: false,
    async execute(interaction, client) {
        let idCheck = await User.findOne({ where: { userId: interaction.user.id }})

        console.log(idCheck)

        if (!(idCheck == null)) {
            return interaction.reply('You have already been added.')
        }

        let memberName = interaction.user.username

        try {
            User.sync({ alter: true }).then(() => {
                return User.create({
                    userId: interaction.user.id,
                    userName: memberName,
                    userCurrencyAmount: 0
                })
            })

            await interaction.reply('Added to database')
        } catch (error) {
            console.error(error)
        }
    }
}