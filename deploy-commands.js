const fs = require('node:fs')
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [];

const commandsFolders = fs.readdirSync('./commands');

for (const folder of commandsFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
	
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
	}
}


const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(data => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);