const { Client, Collection, IntentsBitField, EmbedBuilder, PermissionsBitField } = require('discord.js');
const CronJob = require('cron').CronJob
const { prefix, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path')

const data = require('./Data.json');

let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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

const folders = fs.readdirSync('./commands'); // read the directory of folders

// Sets how to find the subfolders with commands
/*for (var folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`); // for each folder, read the files in the folder
    for (var file of files) {
        const command = require(`./commands/${folder}/${file}`); // for each file, set the command
        client.commands.set(command.data.name, command)
    }
}*/

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

// Announces Raid time every Monday at 8:55pm
const raidEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle('Dear Mystic Moon Clan, the blood moon is rising and its time to fight Lassal! Lets get together and RAIIID.')

let raidTime = new CronJob('0 55 20 * * 1', 
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [raidEmbed]})
    },
    null,
    true,
    'America/New_York'
)

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

// Announces Shadow Lottery time on designated days
const lotteryEmbed = new EmbedBuilder()
.setColor('#992D22')
.setTitle('The lottery is about to begin in 5 minutes. Good luck!')

let shadowLottery = new CronJob('0 55 11,18,21 * * *',
    function() {
        client.channels.cache.get(data.diabloNewsChannel).send(`<@&${data.diabloNotifRole}>`)
        client.channels.cache.get(data.diabloNewsChannel).send({embeds: [lotteryEmbed]})
    },
    null,
    false,
    'America/New_York'
)

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	
	if (user.bot) return;
	if (!reaction.message.guild) return;
	
	if (reaction.message.channel.id == data.diabloOptChannel) {
        switch(reaction.emoji.id) {
            case diabloNotifEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.add(data.diabloNotifRole)
                break
            case barbarianEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.add(data.barbarianRole)
                break
            case crusaderEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.add(data.crusaderRole)
                break
            case monkEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.add(data.monkRole)
                break
            case dhEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.add(data.dhRole)
                break
            case wizardEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.add(data.wizardRole)
                break
            case necromancerEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.add(data.necromancerRole)
                break
            default:
                return
        }
	}
})

client.on('guildMemberAdd', async member => {
    member.roles.add('378271467969970176')
})

client.on('messageReactionRemove', async (reaction, user) => {

	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	
	if (user.bot) return;
	if (!reaction.message.guild) return;
	
	if (reaction.message.channel.id == data.diabloOptChannel) {
		switch(reaction.emoji.id) {
            case diabloNotifEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.remove(data.diabloNotifRole)
                break
            case barbarianEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.remove(data.barbarianRole)
                break
            case crusaderEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.remove(data.crusaderRole)
                break
            case monkEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.remove(data.monkRole)
                break
            case dhEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.remove(data.dhRole)
                break
            case wizardEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.remove(data.wizardRole)
                break
            case necromancerEmoji:
                await reaction.message.guild.members.cache.get(user.id).roles.remove(data.necromancerRole)
                break
            default:
                return
        }
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand) return;

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