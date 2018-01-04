require('./config/config')
require('./api/models/tradeListModel')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const eurekaClient = require('./eureka-client')

const props = process.env
mongoose.Promise = global.Promise
mongoose.connect(props.MONGODB_URI)

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var routes = require('./api/routes/tradeListRoutes')
routes(app)

var server = app.listen(props.PORT, (err) => {
  if (err) return console.log(`Unable to start the trade service api ${err}`)
  console.log(`Trade service api started on ${server.address().address}:${server.address().port}`)
  eurekaClient.start(function (error) {
    console.log(error || 'complete')
  })
})

module.exports = {app}
