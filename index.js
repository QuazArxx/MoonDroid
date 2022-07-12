const Discord = require('discord.js');
const CronJob = require('cron').CronJob
const { prefix, token } = require('./config.json');
const fs = require('fs');

const colors = require('./colors.json');
const functions = require('./functions.js');

let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Sets Discord Intents
const discordIntents = new Discord.Intents()
discordIntents.add(
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
)

const client = new Discord.Client({intents: [discordIntents]});
client.commands = new Discord.Collection();

const folders = fs.readdirSync('./commands'); // read the directory of folders

// Sets how to find the subfolders with commands
for (var folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`); // for each folder, read the files in the folder
    for (var file of files) {
        const command = require(`./commands/${folder}/${file}`); // for each file, set the command
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log('Ready!');
});

// Announces Raid time every Monday at 8:55pm
const raidEmbed = new Discord.MessageEmbed()
.setColor('#992D22')
.setTitle('Dear Mystic Moon Clan, the blood moon is rising and its time to fight Lassal! Lets get together and RAIIID.')

let raidTime = new CronJob('0 55 20 * * 1', 
    function() {
        client.channels.cache.get('995032058479001620').send('<@&995075928742969364>')
        client.channels.cache.get('995032058479001620').send({embeds: [raidEmbed]})
    },
    null,
    true,
    'America/New_York'
)

// Announces Bilefen PVP time on designated days
const bilefenEmbed = new Discord.MessageEmbed()
.setColor('#992D22')
.setTitle('Ancient Arena [PvP] in Bilefen starts in 5 minutes!')

let bilefenEvent = new CronJob('0 25 21 * * 0,2,4,6',
    function() {
        client.channels.cache.get('995032058479001620').send('<@&995075928742969364>')
        client.channels.cache.get('995032058479001620').send({embeds: [bilefenEmbed]})
    },
    null,
    true,
    'America/New_York'
)

const demonGateEmbed = new Discord.MessageEmbed()
.setColor('#992D22')
.setTitle(`Demon Gates in Realm of Damnation starts in 5 minutes!`)

let demonGates1 = new CronJob("0 55 11,21 * * 0,1,4", 
    function() {
        client.channels.cache.get('995032058479001620').send('<@&995075928742969364>')
        client.channels.cache.get('995032058479001620').send({embeds: [demonGateEmbed]})
    },
    null,
    true,
    'America/New_York'
)

let demonGates2 = new CronJob("0 25 20 * * 0,1,4", 
    function() {
        client.channels.cache.get('995032058479001620').send('<@&995075928742969364>')
        client.channels.cache.get('995032058479001620').send({embeds: [demonGateEmbed]})
    },
    null,
    true,
    'America/New_York'
)

const hauntedCarriageEmbed = new Discord.MessageEmbed()
.setColor('#992D22')
.setTitle(`Haunted Carriage in Ashwold Cemetary starts in 5 minutes!`)

let hauntedCarriage1 = new CronJob("0 55 11,21 * * 2,6", 
    function() {
        client.channels.cache.get('995032058479001620').send('<@&995075928742969364>')
        client.channels.cache.get('995032058479001620').send({embeds: [hauntedCarriageEmbed]})
    },
    null,
    true,
    'America/New_York'
)

let hauntedCarriage2 = new CronJob("0 25 20 * * 2,6", 
    function() {
        client.channels.cache.get('995032058479001620').send('<@&995075928742969364>')
        client.channels.cache.get('995032058479001620').send({embeds: [hauntedCarriageEmbed]})
    },
    null,
    true,
    'America/New_York'
)


const ancientNightmareEmbed = new Discord.MessageEmbed()
.setColor('#992D22')
.setTitle(`Ancient Nightmare in Mount Zavain starts in 5 minutes!`)

let ancientNightmare1 = new CronJob("0 55 11,21 * * 3,5", 
    function() {
        client.channels.cache.get('995032058479001620').send('<@&995075928742969364>')
        client.channels.cache.get('995032058479001620').send({embeds: [ancientNightmareEmbed]})
    },
    null,
    true,
    'America/New_York'
)

let ancientNightmare2 = new CronJob("0 25 20 * * 3,5", 
    function() {
        client.channels.cache.get('995032058479001620').send('<@&995075928742969364>')
        client.channels.cache.get('995032058479001620').send({embeds: [ancientNightmareEmbed]})
    },
    null,
    true,
    'America/New_York'
)

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	
	if (user.bot) return;
	if (!reaction.message.guild) return;
	
	if (reaction.message.channel.id == '996243464473821214') {
		if (reaction.emoji.name == ':yes:672316905616572429') {
			await reaction.message.guild.members.cache.get(user.id).roles.add('995075928742969364')
		}
	}
})

client.on('messageReactionRemove', async (reaction, user) => {

	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	
	if (user.bot) return;
	if (!reaction.message.guild) return;
	
	if (reaction.message.channel.id == '996243464473821214') {
		if (reaction.emoji.name == ':yes:672316905616572429') {
			await reaction.message.guild.members.cache.get(user.id).roles.remove('995075928742969364')
        }
    }
})

client.on('messageCreate', async message => {

    if (message.content.toLowerCase() == 'currentday') {
        message.channel.send(`${daysOfTheWeek[currentDayOfWeek]}`)
    }

    if (message.content.toLowerCase() == 'dayarray') {
        message.channel.send(`${DiabloEvents[currentDayOfWeek].day}`)
    }

    if (message.content.toLowerCase() == 'timesarray') {
        message.channel.send(`${timesArrayIndex}`)
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();
    
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
	    command.execute(message, args);
    } 
    
    catch (error) {
	    console.error(error);
	    message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);