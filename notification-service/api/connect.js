const amqp = require('amqplib/callback_api');

const MSG_BROKER = process.env.BROKER_URL;

function connectToBroker(){
    var promise = new Promise(function(resolveFn, rejectFn){
        amqp.connect(MSG_BROKER, (err, conn) =>{
            if(err)
                rejectFn(err);
            resolveFn(conn);
        });
    });
    return promise;
}

function createChannel(){
    var promise = new Promise(function(resolveFn, rejectFn){
        connectToBroker().then((conn) =>{
            conn.createChannel((err, channel) => {
                if(err)
                    rejectFn(err);
                channel.assertQueue(process.env.QUEUE, {durable: false});                    
                resolveFn(channel);
            });
        }).catch((err) =>{
            rejectFn(err);
        });
    })
    return promise;  
}

module.exports.getChannel = () => createChannel();