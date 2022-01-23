const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
var bodyParser = require("body-parser");


var app = express();
app.use(bodyParser.json());

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "",
  secretAccessKey: "",
  endpoint: "http://dynamodb.us-east-1.amazonaws.com",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "post";

exports.add = async (params) => {
  //const userName = req.params.userName;
  const item = {
    TableName: table,
    Item: {
      id: uuidv4(),
      username: params.username,
    },
  };

  try {
    await docClient.put(item).promise();
    return {
      status: true,
      message:"post is added"
    };
  } catch (err) {
    return {
        status:false,
        message:err
    }
  }
};

exports.get = async (params) => {

  //var value = req.params.id;

  var item = {
    TableName: table,
    Key: {
      id: params.id,
    },
  };

  try {
    await docClient.get(item).promise();
    return {
      status: true,
    };
  } catch (err) {
    return {
        status:false,
        message:err
    }
  }
};

exports.getAll = async () => {
  var item = {
    TableName: table,
  };

  try {
    await docClient.get(item).promise();
    return {
      status: true,
    };
  } catch (err) {
    return {
        status:false,
        message:err
    }
  }

};

exports.update = async (params) => {
  console.log(req.body);
  var updatedId = params.id;

  var newusername = params.username;

  var item = {
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

  try {
    await docClient.update(item).promise();
    return {
      status: true,
      message:"post is added"
    };
  } catch (err) {
    return {
        status:false,
        message:err
    }
  }
};

exports.delete = async (params) => {
  var deletedID = params.id;

  var item = {
    TableName: table,
    Key: {
      id: deletedID,
    },
  };

  try {
    await docClient.delete(item).promise();
    return {
      status: true,
      message:"post is added"
    };
  } catch (err) {
    return {
        status:false,
        message:err
    }
  }
};
