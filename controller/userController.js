//importing libraries
const bcrypt = require('bcrypt');
const secretKey = '1234$Secret^Key';
const jwt = require('jsonwebtoken');

//model
const User = require('../model/user');
const Role = require('../model/Role');

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

const getUserwithRole = async (req, res) => {
    const isUser = await User.findOne({ where: { id: req.userId } });
    if (isUser) {
        const response = await User.findAll({
            where: { id: req.userId },
            attributes: { exclude: ['password'] },
            include: {
                model: Role,
                attributes: ['name']
            }
        });
        res.json(response)
    }
    else {
        res.status(401).json({ "message": 'Access Denied / User not logged in', 'success': false });
    }
};



// const addUser = async (req, res) => {
//     const { password } = req.body;

//     try {
//         const securePass = await bcrypt.hash(password, 10);
//         req.body.password = securePass;

//         const createdUser = await User.create(req.body);

//         if (createdUser) {
//             res.json({ 'message': 'User Added Successfully', 'success': true });
//         } else {
//             res.json({ 'message': 'Failed to create user', 'success': false });
//         }
//     } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             res.json({ 'message': 'User with this username already exists. Please choose a different username.', 'success': false });
//         } else {
//             res.json({ 'message': error.message, 'success': false });
//         }
//     }
// };

const addUser = async (req, res) => {
    const { password } = req.body;

    try {
        const securePass = await bcrypt.hash(password, 10);
        req.body.password = securePass;

        const createdUser = await User.create(req.body);

        if (createdUser) {
            res.status(201).json({ 'message': 'User Added Successfully', 'success': true });
        } else {
            res.status(500).json({ 'message': 'Failed to create user', 'success': false });
        }
    } catch (error) {
        // res.json({'error': error })
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(401).json({ 'message': 'User with this username already exists', 'success': false });
        } else {
            res.status(500).json({ 'message': error.message, 'success': false });
        }
    }
};

const updateUser = async (req, res) => {

    try {
        const updatedUser = await User.update(req.body, { where: { id: req.params.id } });
        if (updatedUser) {
            res.status(201).json({ 'message': 'User Updated Successfully', 'success': true });
        } else {
            res.status(401).json({ 'message': 'Failed to update user', 'success': false });
        }
    } catch (error) {
        res.status(500).json({ 'message': error.message, 'success': false });
    }
}



const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (user) {
            const securePass = await bcrypt.compare(password, user.password);
            if (!securePass) {
                res.status(401).json({ "message": "Invalid credentials", 'success': false });
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
            res.status(401).json({ "message": 'Invalid credentials', 'success': false });
        }
    } catch (error) {
        res.status(500).json({ 'message': 'Internal Server Error', 'success': false });
    }
};







//exporting
module.exports = {
    addUser,
    getUser,
    updateUser,
    getUserwithRole,
    login
}