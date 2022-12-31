const { Sequelize } = require('sequelize')
const { database, dbUsername, dbPassword } = require('../config.json')

const sequelize = new Sequelize(database, dbUsername, dbPassword, {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = {
    sequelize
}