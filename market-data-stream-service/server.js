require('./config/config')
require('./model/market-data')

const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const eurekaClient = require('./eureka-client')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var routes = require('./routes/market-data-route')
routes(app)

let server = app.listen(process.env.PORT, (err) => {
  if (err) return console.log(`Unable to start the market data service api ${err}`)
  console.log(`Market data service started on ${server.address().address}:${server.address().port}`)
  eurekaClient.start(function (error) {
    console.log(error || 'complete')
  })
})
