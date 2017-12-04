const express = require('express'),
      _ = require('lodash'),
      {mongoose} = require('../db/mongoose'),
      {Trade} = require('../models/trade');

const router = express.Router();

router.post('/trades', function(req, res, next) {
  var trade =  {
    qty:50
  };
    //_.pick(req.body, ['qty','side']);

  trade.save().then((tradeObj) =>{
      res.send(tradeObj);
  }).catch((e) =>{
    res.status(400).send();
  });
});

router.get('/trades', function(req, res, next) {
  Trade.find().then((trades) =>{
      res.send({trades});
  });
});

module.exports = router;
