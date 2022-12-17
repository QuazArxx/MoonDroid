const { Client, Collection, IntentsBitField, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const fs = require('node:fs');
const path = require('node:path')

const data = require('./Data.json');

// Sets Discord IntentsBitField
const discordIntents = new IntentsBitField()
discordIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.MessageContent
)

const client = new Client({intents: discordIntents, partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => console.log('Ready!'));

client.on('guildMemberAdd', async member => {
    member.roles.add('378271467969970176')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return

    switch (interaction.customId) {
        case 'diabloImmortalIn':
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.diabloImmortalRole)
            break
        case 'diabloImmortalOut':
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.diabloImmortalRole)
            break
        case 'diabloNotif':
            if (!interaction.member.roles.cache.has(data.diabloNotifRole)) {
                await interaction.reply({ content: "You will now receive Diablo notifications.", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.diabloNotifRole)
            } else {
                await interaction.reply({ content: "You will no longer receive Diablo notifications.", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.diabloNotifRole)
            }
            break
        case 'barbarian':
            if (!interaction.member.roles.cache.has(data.barbarianRole)) {
                await interaction.reply({ content: "You have added the Barbarian role!", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.barbarianRole)
            } else {
                await interaction.reply({ content: "You have removed the Barbarian role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.barbarianRole)
            }
            break
        case 'crusader':
            if (!interaction.member.roles.cache.has(data.crusaderRole)) {
                await interaction.reply({ content: "You have added the Crusader role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.crusaderRole)
            } else {
                await interaction.reply({ content: "You have removed the Crusader role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.crusaderRole)
            }
            break
        case 'monk':
            if (!interaction.member.roles.cache.has(data.monkRole)) {
                await interaction.reply({ content: "You have added the Monk role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.monkRole)
            } else {
                await interaction.reply({ content: "You have removed the Monk role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.monkRole)
            }
            break
        case 'demonhunter':
            if (!interaction.member.roles.cache.has(data.dhRole)) {
                await interaction.reply({ content: "You have added the Demon Hunter role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.dhRole)
            } else {
                await interaction.reply({ content: "You have removed the Demon Hunter role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.dhRole)
            }
            break
        case 'wizard':
            if (!interaction.member.roles.cache.has(data.wizardRole)) {
                await interaction.reply({ content: "You have added the Wizard role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.wizardRole)
            } else {
                await interaction.reply({ content: "You have removed the Wizard role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.wizardRole)
            }
            break
        case 'necromancer':
            if (!interaction.member.roles.cache.has(data.necromancerRole)) {
                await interaction.reply({ content: "You have added the Necromancer role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.necromancerRole)
            } else {
                await interaction.reply({ content: "You have removed the Necromancer role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.necromancerRole)
            }
            break
        case "dreamerOptOut":
            if (!interaction.member.roles.cache.has(data.dreamersRole)) {
                await interaction.reply({ content: "You have added the Dreamers role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.dreamersRole)
            } else {
                await interaction.reply({ content: "You have removed the Dreamers role", ephemeral: true})
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.dreamersRole)
            }
        default:
            return  
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand) return

    const command = interaction.client.commands.get(interaction.commandName)
    
    if (!command) return;

    if (command.data.officerCommand == true && !interaction.user.roles.cache.has(data.diabloOfficerRole)) return

    try {
	    await command.execute(interaction, client);
    }  
    catch (error) {
	    console.error(error);
	    await interaction.reply({ content: 'Something went wrong! Don\'t worry though, Quaz has been notified.', ephemeral: true })

        const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('Command Error')
        .addFields(
            {name: `${interaction.user.username} tried to use "${interaction}" but it failed.`, value: `${error}`}
        )
        await client.users.send(data.quazId, { embeds: [embed] })
    }
})

client.login(token);