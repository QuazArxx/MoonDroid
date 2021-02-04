const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');

const colors = require('./colors.json');

const client = new Discord.Client();
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

// Welcomes new members into the server
client.on('guildMemberAdd', member => {
    const embed = new Discord.MessageEmbed()
    .setColor(colors.green)
    .setTitle(`Welcome **${member.user.username}** to Planet Q! Feel to take a look around and enjoy many of our exotic cuisines!`)

	member.guild.channels.cache.get('806961672329232475').send(embed);
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