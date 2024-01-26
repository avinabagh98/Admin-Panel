//Database Connection
const Database = require('../model/database')

//Models ////////////
const Usertype = require('../model/usertype');
try {
    Usertype.sync({ alter: true });
} catch (error) { }


const User = require('../model/user');
try {
    User.sync({ alter: true });
} catch (error) { }

//Associations/////////
User.hasOne(Usertype, { foreignKey: 'userId', onDelete: 'cascade' });
Usertype.belongsTo(User);

//Server Connection ---------------------------------------------------------------
const express = require('express');
const server = express();
const port = 8080;


//Middlewares 
const cors = require('cors');
const bodyParser = require('body-parser');
server.use(cors());
server.use(bodyParser.json());


//Routes/ APIs  ---------------------------------------------------------------

//USER API
server.get('/getuser', async (req, res) => {
    const response = await User.findAll();
    res.json(response)
});

server.post('/adduser', async (req, res) => {
    const response = await User.create(req.body);
    res.json(response)
});

// Usertype-API
server.get('/getusertype', async (req, res) => {
    const response = await Usertype.findAll();
    res.json(response)
});

server.post('/addusertype', async (req, res) => {
    const response = await Usertype.create(req.body);
    res.json(response)
});



//Server Listening ------------------------------------------------------------
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
