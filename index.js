const { Client, Collection, IntentsBitField, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const fs = require('node:fs');

const data = require('./Data.json');
//const { sequelize } = require('./Database/server');
//const { User } = require('./Database/Models/User');

const CronJob = require('cron').CronJob

// Announces Bilefen PVP time on designated days
const arenaEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle('Ancient Arena [PvP] in Bilefen starts in 5 minutes!')

let arenaEvent = new CronJob('0 25 21 * * 0,2,4,6',
    function() {
        client.channels.cache.get(data.WorldChatChannel).send({embeds: [arenaEmbed]})
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
        client.channels.cache.get(data.ClanChatChannel).send({embeds: [assemblyEmbed]})
    },
    null,
    true,
    'America/New_York'
)

// Announces Shadow War time on designated days
const warEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle('Shadow War is about to begin! Everyone get ready to win!')

let warEvent = new CronJob('0 25 19 * * 4,6',
    function() {
        client.channels.cache.get(data.ShadowTingsChannel).send(`<@&${data.diabloClanRole}>`)
        client.channels.cache.get(data.ShadowTingsChannel).send({embeds: [warEmbed]})
    },
    null,
    true,
    'America/New_York'
)

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

const commandsFolders = fs.readdirSync('./commands');

for (const folder of commandsFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
	
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.data.name, command)
	}
}

client.once('ready', () => console.log('Ready!'));

client.on('guildMemberAdd', async member => {
    member.roles.add('378271467969970176')

    // Check if new member is a bot
    // if not a bot, check if in database
        // add member to database if not in
})

/*client.on('messageCreate', async message => {
    // Check if speaker is in the database or a bot
        // If they are neither, return
    // RNG whether the speaker gets currency
        // If RNG succeeds, run GiveCurrency method
        GiveCurrency(message)
})*/

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand || !interaction.isButton) return

    const command = interaction.client.commands.get(interaction.commandName)
    
    if (!command) return;

    if (command.data.officerCommand == true && !interaction.user.roles.cache.has(data.diabloOfficerRole)) return

    try {
	    await command.execute(interaction, client)
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

client.login(token);
/*sequelize.authenticate()

async function GiveCurrency(message) {
    // give a certain amount of currency to whoever spoke.
        // RNG an amount and add to database
    let randomAmount = Math.floor(Math.random() * 10)
    if (randomAmount == 0) randomAmount = 1

    await User.increment(
        { userCurrencyAmount: +randomAmount },
        { where: { userId: message.author.id } }
    )

    // let them know how much they received
        // let them know how much they currently have after receiving the currency
}*/