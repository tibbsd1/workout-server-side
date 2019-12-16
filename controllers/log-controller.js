var express = require('express');
var router = express.Router()
var sequelize = require('../db');
var testModel = sequelize.import('../models/log');

router.get('/yourlogs', function (req,res){
    var userid = req.user.id
    testModel
      .findAll({
          where: {owner:userid}
      }).then(user => {
          req.user = user
          next()
      })
    
      .then(
          function findAllSuccess(data) {
              console.log("Controller data:", data);
              res.json(data);
          },
          function findAllError(err) {
              res.send(500, err.message);
          }
      );
      res.send("Hopefully this shows up somewhere")
    });

router.post('/buildlogs', function (req,res){
    
    testModel.create({
        description: req.body.log.description,
        definition:req.body.log.definintion,
        result: req.body.log.result,
        owner: req.user.id
    }).then(
        function logDataTest(){
            res.send("I did something")
        }
    );
});

router.get('/:id',function (req,res){    
    var primaryKey = req.params.id
    var owner = req.user.id
    testModel.findOne(
        {
            where: {id:primaryKey,
                owner:owner
            }
        }
    ).then(
        data => {
            return data /*if not null */ ? res.json(data)/*display data*/:res.send("Not Authorized to view row")/*else show errors*/ 
        }
    ),  err => res.send(500, err.message);
    });
    
    router.put('/update/:id', function (req,res){
        var owner = req.user.id
        var primaryKey = req.params.id
        var logData = req.body.log.item
    
        testModel.update({
            logData:logData
        }, {where: {id: primaryKey, owner: owner}}
        ).then(
            data => {return res.json(data)
            }
        ), err => res.send(500, err.message);
    });
    
    
    
    router.delete('/delete/:id', function (req,res){
        var primaryKey = req.params.id
        var owner = req.user.id
    
        testModel.destroy({
            where:{id:primaryKey, owner:owner}
        }).then(data =>{
            return data>0 ? res.json("item deleted") : res.send("Nothing deleted")
        }), err => res.send(500, err.message)
    })

module.exports = router;