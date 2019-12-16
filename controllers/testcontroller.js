var express = require('express');
var router = express.Router()
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');

router.get("/helloclient", function (req,res){
    res.send("Hello from helloclient")
})

router.post('/four', function (req,res){
    var testData = req.body.testdata.item;
    TestModel.create({
        testdata: testData
    }) .then(
        function message() {
            res.send("Test 4 went through!");
        }
    );
});


router.post('/three', function(req,res){
    let newTestData = req.body.testdata
    let newFirstName = req.body.threeFirstName
    TestModel.create({
        testdata: newTestData,
        firstname: newFirstName
    
    }
    ).then(res.send('test data success 3'))
})

router.post('/one', function(req,res){
    res.send('Test 1 went through')
})

router.post('/two', function (req,res){
    let data = "this is test data 2"
    TestModel.create({
        testdata: data,
        firstname: "Dale"
    }).then(res.send('test data success'))
})
router.get('/', function(req,res){
    res.send("hey!!! hello pagan. Test route")
})

router.post('/seven', function(req,res){
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata){
            res.json({
                testdata: testdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/one', function(req, res) {
  
    TestModel
      .findAll({ //1
          attributes: ['id', 'testdata']
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
  });

module.exports = router