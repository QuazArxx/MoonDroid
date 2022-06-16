const Discord = require('discord.js');
const CronJob = require('cron').CronJob
const { prefix, token } = require('./config.json');
const fs = require('fs');

const colors = require('./colors.json');
const functions = require('./functions.js');

let raidTime = new CronJob('0 45 20 * * 1', 
    function() {
        console.log('My message')
    },
    null,
    true,
    'America/New_York'
)

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

client.on('message', async message => {

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