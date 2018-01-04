require('../db/mongoose')
var express = require('express')
var router = express.Router()
const {CounterParty} = require('../models/counterparty')
const _ = require('lodash')

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

router.get('/', function (req, res, next) {
  CounterParty.find({}).then((counterParties) => {
    res.send({counterParties})
  }).catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})

router.post('/', function (req, res, next) {
  var body = _.pick(req.body, ['title', 'code'])
  var counterParty = new CounterParty(body)
  counterParty.save().then((counterParty) => {
    res.send(counterParty)
  }).catch((err) => {
    res.status(400).send()
  })
})

router.delete('/:code', function (req, res, next) {
  CounterParty.findOneAndRemove({code: req.params.code}).then((counterParty) => {
    if (!counterParty)
      return res.status(404).send()
    res.send({counterParty})
  }).catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})

router.patch('/:code', function (req, res, next) {
  CounterParty.findOneAndUpdate({code: req.params.code}, req.body, {new: true}).then((counterParty) => {
    if (!counterParty)
      return res.status(404).send()
    res.send({counterParty})
  }).catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})

router.get('/:code', function (req, res, next) {
  CounterParty.findOne({code: req.params.code}).then((counterParty) => {
    if (!counterParty)
      return res.status(404).send()
    res.send({counterParty})
  }).catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})

module.exports = router
