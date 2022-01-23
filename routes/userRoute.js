const express = require("express");
const Router = require("router");
var bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())


var router = Router();

const userContoller = require("../controllers/userController");

router.post('/adduser/:userName', userContoller.addUser )

router.put('/updateuser/:id', userContoller.updateUser)

router.get('/findUser/:id', userContoller.findUser)

router.delete('/deleteuser/:id', userContoller.deleteUser)

router.get('/getalluser', userContoller.getAll)

router.get('/login', userContoller.login)  

router.put('/register', userContoller.register)  




module.exports = router;

