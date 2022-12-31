const { DataTypes } = require('sequelize')
const { sequelize } = require('../server')

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userDisplayName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userCurrencyAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = {
    User
}