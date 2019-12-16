var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user"); //models is format for data, controllers are endopoints or path
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



router.post("/createuser", function(req, res) {
    //   var userName = "fake@fake.com";
    //   var password = "ThisIsAPassword";
    var userName = req.body.user.username;
    var password = req.body.user.passwordhash;
    User.create({
      username: userName,
      passwordhash: bcrypt.hashSync(password, 10)
    }).then(
      function createSuccess(user) {
        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
        });
        res.json({
          user: user,
          message: "created",
          sessionToken: token
        });
      },
      function createError(err) {
        res.send(500, err.message);
      }
    );
  });
  

// router.post("/signin", function(req, res) {
//   // var userName = "fake@fake.com"
//   // var password = "ThisIsAPassword"

//   var userName = req.body.user.username;
//   var password = req.body.user.password;

//   User.create({
//     username: userName,
//     passwordhash: bcrypt.hashSync(password, 10)
//   }).then(
//     function createSuccess(user) {
//       var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//         expiresIn: 60 * 60 * 24
//       });
//       res.json({
//         user: user,
//         message: "created",
//         sessionToken: token
//       });
//     },
//     function createError(err) {
//       res.send(500, err.message);
//     }
//   );
// });



module.exports = router;
