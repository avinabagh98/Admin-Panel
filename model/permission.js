const { Database, DataTypes } = require('../Database/database');

const permission = Database.define('permission', {
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
            isIn: [['create_user', 'read_user', 'update_user', 'delete_user', 'create_role', 'read_role', 'update_role', 'delete_role', 'create_permission', 'read_permission', 'update_permission', 'delete_permission']]
        }
    }
}, {
    freezeTableName: true
});

module.exports = permission;