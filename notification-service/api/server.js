require('../config/config')

const app = require('express')()
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer)

const Subscriber = require('./subscriber')
const eurekaClient = require('../eureka-client')

var server = httpServer.listen(process.env.PORT, (err) => {
  if (err) return console.log(`Unable to start the notification service api ${err}`)
  console.log(`Notification service api started on ${server.address().address}:${server.address().port}`)
  eurekaClient.start(function (error) {
    console.log(error || 'complete')
  })

  io.on('connection', function (socket) {
    socket.on('notification', function (msg) {
      var subscriber = new Subscriber()
      subscriber.receiveMessage().then((msg) => {
        io.emit('notification', msg)
      }).catch((err) => {
        console.error(err)
      })
    })
  })
})
