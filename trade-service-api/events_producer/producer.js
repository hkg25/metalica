const amqp = require('amqplib/callback_api'),
    conn = require('./connect');

const QUEUE = process.env.QUEUE || 'notification-queue';
 
class Publisher{

    constructor(msg){
        this.msg = msg
    }
    publish(){
        console.log(`Going to send ${this.msg} message to queue ${QUEUE}`);
        conn.getChannel().then( (ch) =>{
            ch.sendToQueue(QUEUE, Buffer.from(this.msg));
            console.log(`${this.msg} sent to the queue ${QUEUE}`);
        }).catch((e) =>{
            reportErrors(e);
        });        
    }

    reportErrors(err){  
        console.log(err.stack);
    };
}
 
module.exports = Publisher; 

