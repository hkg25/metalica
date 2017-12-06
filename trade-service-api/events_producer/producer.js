const amqp = require('amqplib/callback_api');

const BROKER_URL = process.env.BROKER_URL;
const QUEUE = process.env.QUEUE;

amqp.connect(BROKER_URL, (err, conn) =>{
    if(err)
       return console.log(err);
    
    conn.createChannel((err, channel) => {
        channel.assertQueue(QUEUE, {durable: false});
        channel.sendToQueue(QUEUE, new Buffer('Hello World!'));
        console.log(" [x] Sent 'Hello World!'");
    });
    setTimeout(() => { conn.close(); process.exit(0) }, 500);
});