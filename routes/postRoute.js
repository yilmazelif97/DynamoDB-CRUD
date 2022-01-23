const express = require("express");
const Router = require("router");
var bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())


var router = Router();

const postController = require("../controllers/postController");

router.post('/addpost', postController.addPost )

router.put('/updatepost', postController.updatePost)

router.get('/findpost/:id', postController.findPost)

router.delete('/deletepost/:id', postController.deletePost)

router.get('/getallpost', postController.getAllPosts)


module.exports = router;
