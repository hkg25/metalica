const amqp = require('amqplib/callback_api');
const {save} = require("../service/notification-service");

const RABBITMQ_URL = process.env.BROKER_URL;
const QUEUE_NAME= process.env.QUEUE_NAME;

amqp.connect(RABBITMQ_URL, function(err, conn) {
    //console.log("-------", conn);
    conn.createChannel(function(err, ch) {
       ch.assertQueue(QUEUE_NAME, {durable: false});
       ch.prefetch(1);
       console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE_NAME);
       ch.consume(QUEUE_NAME, function(msg) {
         console.log(" [x] Received %s", msg.content.toString());
         //Push notification to database
         save(msg);

         //Broadcast message to socket clients to receive notifications.
        
       }, {noAck: false});
       //conn.close();
    });
  });