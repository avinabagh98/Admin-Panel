const { Database, DataTypes } = require('../Database/database');
const rolePermission = Database.define('rolePermission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER
    },
    permissionId: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});
module.exports = rolePermission;