//Database Connection
const { Sequelize, DataTypes } = require('sequelize');

const database = new Sequelize('mydb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

try {
    database.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//database.close()


module.exports = {
    Database: database,
    DataTypes: DataTypes
};

