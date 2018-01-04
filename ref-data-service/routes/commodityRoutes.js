require('../db/mongoose')
var express = require('express')
var router = express.Router()
const {Commodity} = require('../models/commodity')
const _ = require('lodash')

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

router.get('/', function (req, res, next) {
  Commodity.find({}).then((commodities) => {
    res.send({commodities})
  }).catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})

router.post('/', function (req, res, next) {
  var body = _.pick(req.body, ['title', 'code'])
  var commodity = new Commodity(body)
  commodity.save().then((cmdtyObj) => {
    res.send(cmdtyObj)
  }).catch((err) => {
    res.status(400).send()
  })
})

router.delete('/:code', function (req, res, next) {
  Commodity.findOneAndRemove({code: req.params.code}).then((commodity) => {
    if (!commodity)
      return res.status(404).send()
    res.send({commodity})
  }).catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})

router.patch('/:code', function (req, res, next) {
  Commodity.findOneAndUpdate({code: req.params.code}, req.body, {new: true}).then((commodity) => {
    if (!commodity)
      return res.status(404).send()
    res.send({commodity})
  }).catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})

router.get('/:code', function (req, res, next) {
  Commodity.findOne({code: req.params.code}).then((commodity) => {
    if (!commodity)
      return res.status(404).send()
    res.send({commodity})
  }).catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})

module.exports = router
