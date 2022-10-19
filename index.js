const { Client, Collection, IntentsBitField, EmbedBuilder, PermissionsBitField } = require('discord.js');
const CronJob = require('cron').CronJob
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

// Announces Bilefen PVP time on designated days
const bilefenEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle('Ancient Arena [PvP] in Bilefen starts in 5 minutes!')

let bilefenEvent = new CronJob('0 25 21 * * 0,2,4,6',
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [bilefenEmbed]})
    },
    null,
    true,
    'America/New_York'
)

const demonGateEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle(`Demon Gates in Realm of Damnation starts in 5 minutes!`)

let demonGates1 = new CronJob("0 55 11,21 * * 0,1,4", 
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [demonGateEmbed]})
    },
    null,
    true,
    'America/New_York'
)

let demonGates2 = new CronJob("0 25 20 * * 0,1,4", 
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [demonGateEmbed]})
    },
    null,
    true,
    'America/New_York'
)

const hauntedCarriageEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle(`Haunted Carriage in Ashwold Cemetary starts in 5 minutes!`)

let hauntedCarriage1 = new CronJob("0 55 11,21 * * 2,6", 
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [hauntedCarriageEmbed]})
    },
    null,
    true,
    'America/New_York'
)

let hauntedCarriage2 = new CronJob("0 25 20 * * 2,6", 
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [hauntedCarriageEmbed]})
    },
    null,
    true,
    'America/New_York'
)


const ancientNightmareEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle(`Ancient Nightmare in Mount Zavain starts in 5 minutes!`)

let ancientNightmare1 = new CronJob("0 55 11,21 * * 3,5", 
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [ancientNightmareEmbed]})
    },
    null,
    true,
    'America/New_York'
)

let ancientNightmare2 = new CronJob("0 25 20 * * 3,5", 
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [ancientNightmareEmbed]})
    },
    null,
    true,
    'America/New_York'
)

// Announces Assembly time on designated days
const assemblyEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle('The shadows are getting ready to assemble. Assembly starts in 5 minutes!')

let assemblyEvent = new CronJob('0 55 17 * * 1-6',
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [assemblyEmbed]})
    },
    null,
    true,
    'America/New_York'
)

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
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.diabloNotifRole)
            } else {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.diabloNotifRole)
            }
            break
        case 'barbarian':
            if (!interaction.member.roles.cache.has(data.barbarianRole)) {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.barbarianRole)
            } else {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.barbarianRole)
            }
            break
        case 'crusader':
            if (!interaction.member.roles.cache.has(data.crusaderRole)) {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.crusaderRole)
            } else {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.crusaderRole)
            }
            break
        case 'monk':
            if (!interaction.member.roles.cache.has(data.monkRole)) {
                 await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.monkRole)
            } else {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.monkRole)
            }
            break
        case 'demonhunter':
            if (!interaction.member.roles.cache.has(data.dhRole)) {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.dhRole)
            } else {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.dhRole)
            }
            break
        case 'wizard':
            if (!interaction.member.roles.cache.has(data.wizardRole)) {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.wizardRole)
            } else {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.wizardRole)
            }
            break
        case 'necromancer':
            if (!interaction.member.roles.cache.has(data.necromancerRole)) {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.add(data.necromancerRole)
            } else {
                await interaction.deferUpdate()
                await interaction.guild.members.cache.get(interaction.user.id).roles.remove(data.necromancerRole)
            }
            break
        case "dreamerOptOut":
            if (interaction.member.roles.cache.has(data.dreamersRole)) {
                await interaction.deferUpdate()
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

    try {
	    await command.execute(interaction, client);
    }  
    catch (error) {
	    console.error(error);
	    await interaction.reply({ content: 'There was an error trying to execute that command!', ephemeral: true });
    }
});

client.login(token);