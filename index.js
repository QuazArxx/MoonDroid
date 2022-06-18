const Discord = require('discord.js');
const CronJob = require('cron').CronJob
const { prefix, token } = require('./config.json');
const fs = require('fs');

const colors = require('./colors.json');
const functions = require('./functions.js');

// Announces events 5 minutes prior
const DiabloEvents = require('./DiabloEvents.json')

let timesArray = []
let timesArrayIndex = 0

let dayIndex = 0

let currentDayOfWeek = new Date().getDay()

while (!(dayIndex == currentDayOfWeek)) {
    dayIndex++
}

let previousDayOfWeek = DiabloEvents[dayIndex].day

if (DiabloEvents[dayIndex].numberOfEvents == 3) {
    timesArray = ["* * 12 * * *", "* 30 20 * * *", "* * 22 * * *"]
} else {
    timesArray = ["* * 12 * * *", "* 30 20 * * *", "* 30 21 * * *", "* * 22 * * *"]
}

let raidTime = new CronJob(timesArray[timesArrayIndex], 
    function() {
        console.log('My message')
    },
    null,
    true,
    'America/New_York'
)

// checks if the day and time are at the final event of the week and resets both for the next week.
    // Otherwise checks if it's the final event of the day and resets
    // Otherwise changes index to next event
if (dayIndex == 6 && timesArray.length - 1 == timesArrayIndex) {
    dayIndex = 0
    timesArrayIndex = 0
} else if (dayIndex < 6 && timesArray.length - 1 == timesArrayIndex) {
    dayIndex++
    timesArrayIndex = 0
} else {

}

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