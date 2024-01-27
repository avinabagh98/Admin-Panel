const rolePermission = require('../../model/rolePermissionAlot');

const getRolePermission = async (req, res) => {
    const response = await rolePermission.findAll();
    res.json(response)
};

const addRolePermission = async (req, res) => {
    const response = await rolePermission.create(req.body);
    res.json(response)
};

module.exports = {
    getRolePermission,
    addRolePermission
}