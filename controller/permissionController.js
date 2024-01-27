const Permission = require('../model/permission');


const getPermission = async (req, res) => {
    const response = await Permission.findAll();
    res.json(response)
};

const addpermission = async (req, res) => {
    const response = await Permission.create(req.body);
    res.json(response)
}

module.exports = {
    getPermission,
    addpermission
}