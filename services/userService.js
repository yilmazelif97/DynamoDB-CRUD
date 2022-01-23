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

var table = "postuser";


exports.register = async(params)=>{

    const item ={
      TableName : table,
      Item:{
        id: uuidv4(),
        email: params.email,
        username : params.username,
        firstname: params.firsname,
        password: params.password

      }
    }
  
    try{
      await docClient.put(item).promise();
      return{
        status:true,
        message:"üyelik oluşturuldu"
      }
    }
    catch(err){
        return{
            status:false,
            message:"üyelik oluşturulamadı"
        }
    }
  
  }

  exports.login = async(params)=>{

    console.log(params)

    var item = {
        TableName: table,
        Key: {
          email: params.email,
          password:params.password
        },
      };
    
      try {
        const data =await  docClient.get(item).promise()
        //const secret ekle buraya
        ;
        return {
          status: true,
        };
      } catch (err) {
        return {
            status:false,
            message:err
        }
      }

  }