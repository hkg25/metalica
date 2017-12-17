const amqp = require('amqplib/callback_api')
const conn = require('./connect')

const QUEUE_NAME = process.env.QUEUE_NAME

class Subscriber {
  receiveMessage () {
    conn.getChannel().then((ch) => {
      ch.consume(QUEUE_NAME, function (msg) {
        console.log(`${msg} get from the queue ${QUEUE_NAME}`)
        return new Promise((resolve, reject) => {
          resolve(msg)
        })
      }, {noAck: false})
    }).catch((e) => {
      reportErrors(e)
    })
  }

  reportErrors (err) {
    console.log(err.stack)
  }
}

module.exports = Subscriber

const {save} = require('../service/notification-service')

const RABBITMQ_URL = process.env.BROKER_URL

amqp.connect(RABBITMQ_URL, function (err, conn) {
  // console.log("-------", conn)
  if (err) return console.log(err)
  conn.createChannel(function (err, ch) {
    if (err) return console.log(err)
    ch.assertQueue(QUEUE_NAME, {durable: false})
    // ch.prefetch(1)
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', QUEUE_NAME)
    ch.consume(QUEUE_NAME, function (msg) {
      console.log(' [x] Received %s', msg.content.toString())
      // Push notification to database
      save(msg)

      // Broadcast message to socket clients to receive notifications.

    }, {noAck: false})
  // conn.close()
  })
})
