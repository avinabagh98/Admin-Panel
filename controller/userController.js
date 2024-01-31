//importing libraries
const bcrypt = require('bcrypt');
const secretKey = '1234$Secret^Key';
const jwt = require('jsonwebtoken');

//model
const User = require('../model/user');
const Role = require('../model/Role');

//routes


const getUsers = async (req, res) => {
    try {
        const isUser = await User.findOne({ where: { id: req.userId } });
        if (isUser) {
            const response = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            res.status(201).json(response);
        }

    } catch (error) {
        res.status(401).json({ "message": error.response.data.message, 'success': false });
    }
}


const getUserById = async (req, res) => {
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


const getallUserwithRole = async (req, res) => {
    const isUser = await User.findOne({ where: { id: req.userId } });
    if (isUser) {
        const response = await User.findAll({
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


const getUserRolewithId = async (req, res) => {
    const isUser = await User.findOne({ where: { id: req.params.id } });
    if (isUser) {
        const response = await User.findAll({
            where: { id: req.params.id },
            attributes: { exclude: ['password'] },
            include: {
                model: Role,
                attributes: ['name']
            }
        });
        res.json(response)
    }
    else {
        res.status(401).json({ "message": "No user found", 'success': false });
    }
}




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
        const updatedVal = await User.update(req.body, { where: { id: req.params.id } });
        if (updatedVal) {
            res.status(201).json({ 'response': updatedVal, 'message': 'User Updated Successfully', 'success': true });
        } else {
            res.status(401).json({ 'response': updatedVal, 'message': 'Failed to update user', 'success': false });
        }
    } catch (error) {
        res.status(500).json({ 'message': error.message, 'success': false });
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedVal = await User.destroy({ where: { id: req.params.id } });
        if (deletedVal) {
            res.status(201).json({ 'response': deletedVal, 'message': 'User Deleted Successfully', 'success': true });
        } else {
            res.status(401).json({ 'response': deletedVal, 'message': 'Failed to delete user', 'success': false });
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
    getUsers,
    addUser,
    getUserById,
    updateUser,
    getallUserwithRole,
    getUserwithRole,
    getUserRolewithId,
    deleteUser,
    login
}