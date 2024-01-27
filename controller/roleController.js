const Role = require('../model/Role');

const getRole = async (req, res) => {
    const response = await Role.findAll();
    res.json(response)
};

const addRole = async (req, res) => {
    const response = await Role.create(req.body);
    res.json(response)
}


module.exports = {
    getRole,
    addRole
}