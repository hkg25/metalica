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

module.exports = router;
