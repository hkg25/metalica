require("../db/mongoose");
var express = require('express');
var router = express.Router();
const {CounterParty} = require("../models/counterparty");
const _ = require("lodash");


router.get('/', function(req, res, next) {
  CounterParty.find({}).then((counterParties)=>{
        res.send({counterParties});
    }).catch((err)=>{
        res.status(400).send();
    });
});

router.post('/', function(req, res, next) {
    var body = _.pick(req.body,["title","code"]);
    var counterParty = new CounterParty(body);
    counterParty.save().then((cptyObj)=>{
        res.status(200).send(cptyObj);
    }).catch((err)=>res.status(400).send());
});

router.delete('/:code', function(req, res, next) {
    CounterParty.remove({code:req.params.code}).then((counterParty)=>{
        res.send({counterParty});
    }).catch((err)=>{
        res.status(400).send();
    });
});

router.patch('/:code', function(req, res, next) {
    CounterParty.findOneAndUpdate({code:req.params.code},req.body,{new:true}).then((counterParty)=>{
        res.send({counterParty});
    }).catch((err)=>{
        res.status(400).send();
    });
});

router.get('/:code', function(req, res, next) {
    CounterParty.findOne({code:req.params.code}).then((counterParty)=>{
        res.send({counterParty});
    }).catch((err)=>{
        res.status(400).send();
    });
});


module.exports = router;
