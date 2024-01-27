const { Database, DataTypes } = require('../Database/database');

const role = Database.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['super_admin', 'admin', 'data_entry_operator']],
        }

    },


}, {
    freezeTableName: true
});

module.exports = role;