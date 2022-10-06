const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays commands'),
    category: 'extra',
    async execute(interaction, client) {
        const commands = client.commands
        const commandCategories = [    
            {    
                commandCategory: "Main",
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
            }
        ]

        commands.sweep(command => command.category === 'extra')

        if (!(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
            commands.sweep(command => command.category === 'admin')
            commands.sweep(command => command.category === 'testing')
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

        interaction.reply({ content: commandsList, ephemeral: true })
    }
}