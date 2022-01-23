const expressjwt = require("express-jwt");

const joi = require('joi')
 

const secret = "deneme";

module.exports=jwt;

function jwt() {
  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/user/login"],
  });
};