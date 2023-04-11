const { SlashCommandBuilder } = require('discord.js')

const data = require('../../Data.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays commands'),
    category: 'extra',
    officerCommand: false,
    async execute(interaction, client) {
        let commands = client.commands
        const commandCategories = [    
            {    
                commandCategory: "General",
                commandArray: []
            },

            {
                commandCategory: "Currency",
                commandArray: []
            },

            {    
                commandCategory: "Misc",
                commandArray: []
            },

            {
                commandCategory: "Admin",
                commandArray: []
            },

            {
                commandCategory: "Testing",
                commandArray: []
            },

            {
                commandCategory: "Extra",
                commandArray: []
            }
        ]

        if (!(interaction.member.roles.cache.has(data.botManagerRole))) {
            commands.filter(command => command.category === 'extra')
        }

        if (!(interaction.member.roles.cache.has(data.diabloOfficerRole)) || !(interaction.member.roles.cache.has(data.botManagerRole))) {
            commands.filter(command => command.category === 'admin')
            commands.filter(command => command.category === 'testing')
        }

        for (let x = 0; x < commandCategories.length; x++) {
            commands.forEach((command) => {
                if (command.category === commandCategories[x].commandCategory.toLowerCase()) {
                    commandCategories[x].commandArray.push(command)
                }
            });
        }

        let commandsList = ''

        for(let x = 0; x < commandCategories.length; x++) {
            if (commandCategories[x].commandArray.length == 0) continue

            commandsList += `**__${commandCategories[x].commandCategory}__**\n`

            for (let y = 0; y < commandCategories[x].commandArray.length; y++) {
                commandsList += `__/${commandCategories[x].commandArray[y].data.name}__ - ${commandCategories[x].commandArray[y].data.description}\n`
            }

            commandsList += `\n`
        }
        
        await interaction.reply({ content: commandsList, ephemeral: true })
    }
}