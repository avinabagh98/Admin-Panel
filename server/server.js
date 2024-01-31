//Database Connection
const Database = require('../Database/database')

///////////////////Models////////////////////////////////////////////////////////

const Role = require('../model/Role');
try {
    Role.sync({ alter: true });
} catch (error) { console.log(error) }


const User = require('../model/user');
try {
    User.sync({ alter: true });
} catch (error) { console.log(error) }


const Permission = require('../model/permission');
try {
    Permission.sync({ alter: true });
}
catch (error) { console.log(error) }

const RolePermission = require('../model/rolePermissionAlot');
try {
    RolePermission.sync({ alter: true });
}
catch (error) { console.log(error) }



/////////////////////////////Associations/////////////////////////////////////////////////////

Role.hasMany(User, { foreignKey: 'roleId', onDelete: 'cascade' }); //OneToMany
User.belongsTo(Role)

Role.belongsToMany(Permission, { through: RolePermission, onDelete: 'cascade' });
Permission.belongsToMany(Role, { through: RolePermission });





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
//Importing middlewires
const fetchUser = require('../middlewares/fetchUser');

//Importing controllers
const userController = require('../controller/userController');
const roleController = require('../controller/roleController');
const permissionController = require('../controller/permissionController');
const rolePermissionController = require('../controller/alotControllers/rolePermission');

//USER API
server.get('/getusers', fetchUser, userController.getUsers);
server.get('/getuserbyid', fetchUser, userController.getUserById);
server.get('/getuserwithrole', fetchUser, userController.getUserwithRole);
server.get('/getalluserwithrole', fetchUser, userController.getallUserwithRole);
server.get('/getuserrolewithid/:id', userController.getUserRolewithId);
server.post('/adduser', userController.addUser);
server.post('/login', userController.login);
server.put('/updateuser/:id', userController.updateUser);
server.delete('/deleteuser/:id', userController.deleteUser);

// Role-API
server.get('/getroles', roleController.getRoles);
server.post('/addrole', roleController.addRole);
server.post('/getrolebyid/:id', roleController.getRoleById);

// Permission-API
server.get('/getpermission', permissionController.getPermission);
server.post('/addpermission', permissionController.addpermission);

//rolePermissionAlot-API
server.get('/getrolepermissionalot', rolePermissionController.getRolePermission);
server.post('/addrolepermissionalot', rolePermissionController.addRolePermission);



//Server Listening ------------------------------------------------------------
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
