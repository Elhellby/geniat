const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const { version } = require('../../package.json');
const env = require('../utils/enviromen')
const permissions = require('../data/permissions.json')


validaToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(bearerToken, env.getKey('KEY'), async (error, usr) => {
      console.log(usr.existUser)
      if (usr != undefined) {
        let method = req.method
        let role = usr.existUser.Role
        let permission = permissions.find(f => f.role == role)
        if (permission && permission.permissions.length > 0) {
          let methodPermission=permission.permissions.find(f=>f==method)
          if(methodPermission && methodPermission.length>0){
            next()
          }else{
            res.status(401).json({ success: false, message: "Acceso denegado" });
          }
        } else {
          res.status(401).json({ success: false, message: "Acceso denegado" });
        }
      } else {
        res.status(401).json({ success: false, message: "Acceso denegado" });
      }
    });
  } else {
    res.status(401).json({ success: false, message: "Acceso denegado" });
  }
};

app.use('/api', require("../routes/securityRoute"));
app.use('/api/user', require("../routes/userRoute"));
app.use('/api/post', validaToken, require("../routes/postRoute"));

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Im here',
    version: version,
    date: new Date()
  });
})

module.exports = app;