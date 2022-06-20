const Discord = require('discord.js');
const CronJob = require('cron').CronJob
const { prefix, token } = require('./config.json');
const fs = require('fs');

const colors = require('./colors.json');
const functions = require('./functions.js');

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
.setTitle('Dear Mystic Moon Clan, the blood moon is rising and its time to fight Lassal!  Lets get together and RAIIID.')

let raidTime = new CronJob('0 55 20 * * 1', 
    function() {
        client.channels.cache.get('982389292619923456').send('<@&982322327519887400>')
        client.channels.cache.get('982389292619923456').send({embeds: [raidEmbed]})
    },
    null,
    true,
    'America/New_York'
)

// Announces Bilefen PVP time on designated days
const bilefenEmbed = new Discord.MessageEmbed()
.setColor('#992D22')
.setTitle('Ancient Arena [PVP] in Bilefen starts in 5 minutes!')

let bilefenEvent = new CronJob('0 25 21 * * 0,2,4,6',
    function() {
        client.channels.cache.get('982389292619923456').send('<@&982322327519887400>')
        client.channels.cache.get('982389292619923456').send({embeds: [bilefenEmbed]})
    },
    null,
    true,
    'America/New_York'
)

// Announces events 5 minutes prior
const DiabloEvents = require('./DiabloEvents.json')

let timesArray = ["0 55 11 * * *", "0 25 20 * * *", "0 55 21 * * *"]
let timesArrayIndex = 2

let dayIndex = 0

let currentDayOfWeek = new Date().getDay()

while (!(dayIndex == currentDayOfWeek)) {
    dayIndex++
}

let eventName = DiabloEvents[dayIndex].eventNames[timesArrayIndex]
let eventLocation = DiabloEvents[dayIndex].location

const eventEmbed = new Discord.MessageEmbed()
.setColor('#992D22')
.setTitle(`${eventName} in ${eventLocation} starts in 5 minutes!`)

let eventTime = new CronJob(timesArray[timesArrayIndex], 
    function() {
        client.channels.cache.get('982389292619923456').send('<@&982322327519887400>')
        client.channels.cache.get('982389292619923456').send({embeds: [eventEmbed]})
    },
    null,
    true,
    'America/New_York'
)

// checks if the day and time are at the final event of the week and resets both for the next week.
    // Otherwise checks if it's the final event of the day and resets
if (dayIndex == 6 && timesArray.length - 1 == timesArrayIndex) {
    dayIndex = 0
    timesArrayIndex = 0
} else if (dayIndex < 6 && timesArray.length - 1 == timesArrayIndex) {
    timesArrayIndex = 0
} else {
    timesArrayIndex++
}

client.on('messageCreate', async message => {

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