//buraya fonksiyonlarım gelcek

const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

const postService = require("../services/postService");

exports.addPost = async (req, res) => {

  const response = await postService.add(req.body);

  console.log("Adding a new item...");

  res.send(response);
};

exports.findPost = async (req, res) => {


  const response = await postService.get(req.params);


  res.send(response);

    if (err) {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
  };


exports.updatePost = async (req, res) => {
    const response = await postService.update(req.body);


  res.send(response);
  
};

exports.deletePost = async (req, res) => {

    const response = await postService.delete(req.params);


  res.send(response);

 
};

exports.getAllPosts = async (req, res) => {


    const response = await postService.getAll();

  
    res.send(response);

  
};
