require("../db/mongoose");
var express = require('express');
var router = express.Router();
const {Location} = require("../models/location");
const _ = require("lodash");

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/', function(req, res, next) {
  Location.find({}).then((locations)=>{
        res.send({locations});
    }).catch((err)=>{
        res.status(400).send();
    });
});

router.post('/', function(req, res, next) {
    var body = _.pick(req.body,["title","code"]);
    var location = new Location(body);
    location.save().then((locationObj)=>{
        res.status(200).send(locationObj);
    }).catch((err)=>res.status(400).send());
});

router.delete('/:code', function(req, res, next) {
    Location.remove({code:req.params.code}).then((location)=>{
        res.send({location});
    }).catch((err)=>{
        res.status(400).send();
    });
});

router.patch('/:code', function(req, res, next) {
    Location.findOneAndUpdate({code:req.params.code},req.body,{new:true}).then((location)=>{
        res.send({location});
    }).catch((err)=>{
        res.status(400).send();
    });
});

router.get('/:code', function(req, res, next) {
  Location.findOne({code:req.params.code}).then((location)=>{
        res.send({location});
    }).catch((err)=>{
        res.status(400).send();
    });
});


module.exports = router;
