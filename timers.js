const CronJob = require('cron').CronJob
const { EmbedBuilder } = require('discord.js')

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