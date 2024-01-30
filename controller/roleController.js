const Role = require('../model/Role');

const getRoles = async (req, res) => {
    try {
        const response = await Role.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ 'message': 'Role cannot fetch', 'success': false });
    }
}

const addRole = async (req, res) => {
    const response = await Role.create(req.body);
    res.json(response)
}

const getRoleById = async (req, res) => {
    try {
        const response = await Role.findOne({ where: { id: req.params.id } });
        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({ 'message': 'Role cannot fetch', 'success': false });
    }
};


module.exports = {
    getRoles,
    addRole,
    getRoleById
}