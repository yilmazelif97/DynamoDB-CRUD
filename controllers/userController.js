//buraya fonksiyonlarım gelcek

const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
var bodyParser = require("body-parser");

const userService = require("../services/userService");


var app = express();
app.use(bodyParser.json());

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "",
  secretAccessKey: "",
  endpoint: "http://dynamodb.us-east-1.amazonaws.com",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "postuser";




exports.addUser = (req, res) => {
  const userName = req.params.userName;

  var params = {
    TableName: table,
    Item: {
      id: uuidv4(),
      username: userName,
    },
  };

  console.log("Adding a new item...");

  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.send({
        status: false,
        message: "There is an error",
      });
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.send({
        status: true,
        message: "Data added",
      });
    }
  });
};

exports.findUser = (req, res) => {
  var value = req.params.id;

  var params = {
    TableName: table,
    Key: {
      id: value,
    },
  };

  docClient.get(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};

exports.updateUser = (req, res) => {
  console.log(req.body);
  var updatedId = req.params.id;

  var newusername = req.body.username;

  var params = {
    TableName: table,
    Key: {
      id: updatedId,
    },
    UpdateExpression: "set username = :r",
    ExpressionAttributeValues: {
      //":r":"elif" --> static
      ":r": newusername,
    },
    ReturnValues: "UPDATED_NEW",
  };

  console.log("Updating the item...");
  docClient.update(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to update item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      res.send({ message: "updated" });
    }
  });
};

exports.deleteUser = (req, res) => {
  var deletedID = req.params.id;

  var params = {
    TableName: table,
    Key: {
      id: deletedID,
    },
  };

  console.log("Attempting a conditional delete...");
  docClient.delete(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};


exports.getAll = (req, res) => {

  
    var params = {
      TableName: table,
      
    };
  
    docClient.scan(params, function (err, data) {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        res.send({message:"process is done"})
      }
    });
  };



exports.register = async(req,res)=>{
  const response = await userService.register(req.body);

  res.send(response);
}

exports.login = async(req,res)=>{
  const response = await userService.login(req.body)

  res.send(response)
}


