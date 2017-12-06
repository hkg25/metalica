require("../config/config");
const amqp = require('amqplib/callback_api');

const RABBITMQ_URL = process.env.BROKER_URL;
const QUEUE_NAME= process.env.QUEUE_NAME;

amqp.connect(RABBITMQ_URL, function (err, conn){
    if(err){
        console.log(err);   
    }
    conn.createChannel(function(err, ch) {
        ch.assertQueue(QUEUE, {durable: false});
        ch.sendToQueue(QUEUE, new Buffer('Hello World!'));
        console.log(" [x] Sent 'Hello World!'");
    });
    //setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
