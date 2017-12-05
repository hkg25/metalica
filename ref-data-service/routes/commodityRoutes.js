require("../db/mongoose");
var express = require('express');
var router = express.Router();
const {Commodity} = require("../models/commodity");
const _ = require("lodash");


router.get('/commodities', function(req, res, next) {
    Commodity.find({}).then((commodities)=>{
        res.send({commodities});
    }).catch((err)=>{
        res.status(400).send();
    });
});

router.post('/commodity', function(req, res, next) {
    var body = _.pick(req.body,["title","code"]);
    var commodity = new Commodity(body);
    commodity.save().then((cmdtyObj)=>{
        res.status(200).send(cmdtyObj);
    }).catch((err)=>res.status(400).send());
});

module.exports = router;
