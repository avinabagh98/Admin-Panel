const { Database, DataTypes } = require('./database');

const usertype = Database.define('usertype', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }

}, {
    freezeTableName: true
});

module.exports = usertype;