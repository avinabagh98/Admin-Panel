//importing libraries
const bcrypt = require('bcrypt');
const secretKey = '1234$Secret^Key';
const jwt = require('jsonwebtoken');

//model
const User = require('../model/user');

//routes
const getUser = async (req, res) => {
    const isUser = await User.findOne({ where: { id: req.userId } });
    if (isUser) {
        const response = await User.findAll({
            where: { id: req.userId },
            attributes: { exclude: ['password'] }
        });
        res.json(response)
    }
    else {
        res.status(401).json({ "message": 'Access Denied / User not logged in', 'success': false });
    }
};

const addUser = async (req, res) => {
    const { password } = req.body
    const securePass = await bcrypt.hash(password, 10);
    req.body.password = securePass
    const response = await User.create(req.body);
    res.json(response)
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (user) {
            const securePass = await bcrypt.compare(password, user.password);
            if (!securePass) {
                res.status(500).json({ "message": "Wrong Password", 'success': false });
            }
            else {
                const token = jwt.sign(
                    { userId: user.id }, //payload
                    secretKey, //secret key
                    { expiresIn: '30days' }); //expiration

                res.status(200).json({ "message": "Login Successful", 'success': true, "token": token });

            }
        }
        else {
            res.status(401).json({ "message": 'User not found', 'success': false });
        }
    } catch (error) {
        res.status(500).json({ 'message': 'Internal Server Error', 'success': false });
    }
};







//exporting
module.exports = {
    addUser,
    getUser,
    login
}