//model
const User = require('../model/user');

//routes
const addUser = async (req, res) => {
    const response = await User.findAll();
    res.json(response)
};

const getUser = async (req, res) => {
    const response = await User.create(req.body);
    res.json(response)
};

//exporting
module.exports = {
    addUser,
    getUser
}