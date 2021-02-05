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

/*client.on('presenceUpdate', (oldPresence, newPresence) => {
    let oldGame = null;
    
    const guild = client.guilds.cache.get('614134721533968484');
	const streamingRole = guild.roles.cache.find(role => role.id === '720050658149138444');
    
    if (oldPresence) oldGame = oldPresence.activities.find(activity => activity.type === 'STREAMING') ? true : false;
    const newGame = newPresence.activities.find(activity => activity.type === 'STREAMING') ? true : false;
	  
	if (newPresence.user.bot) return;

    if (newPresence.guild == guild) {
	    if (!oldGame && newGame) {         // Started playing.
	    newPresence.member.roles.add(streamingRole)
		    .then(() => console.log(`${streamingRole.name} added to ${newPresence.user.tag}.`))
		    .catch(console.error);
	    } else if (oldGame && !newGame) {  // Stopped playing.
	    newPresence.member.roles.remove(streamingRole)
		    .then(() => console.log(`${streamingRole.name} removed from ${newPresence.user.tag}.`))
		    .catch(console.error);
        }
    }
});*/

// Welcomes new members into the server
client.on('guildMemberAdd', member => {
    const embed = new Discord.MessageEmbed()
    .setColor(colors.green)
    .setTitle(`Welcome **${member.user.username}** to Planet Q! Feel to take a look around and enjoy many of our exotic cuisines!`)

    member.guild.channels.cache.get('806961672329232475').send(embed);
    member.roles.add('806939240755626005');
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