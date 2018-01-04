const io = require("socket.io-client");
var port = process.env.PORT || '3005';
var socket = io(`http://localhost:${port}`);

socket.on("connect", () => {
  console.log("Amqb Worker Connected");
});

function closeOnErr(err, amqpConn) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}

function startWorker(configuration, amqpConn) {
  amqpConn.createChannel(function(err, ch) {
    if (closeOnErr(err, amqpConn)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });
    configuration.queueNames.forEach(function(key) {
      ch.assertQueue(key, { exclusive: false }, function(err, _ok) {
        if (closeOnErr(err, amqpConn)) return;
        ch.bindQueue(key, configuration.exchangeName, key);
        ch.consume(key, processMsg, { noAck: true });
      });

    });

    function processMsg(msg) {
      work(msg, function(ok) {
        try {
          if (ok) {

          } else {
            //ch.reject(msg, true);
          }
        } catch (e) {
          closeOnErr(e, amqpConn);
        }
      });
    }
  });
}

function work(msg, cb) {
  console.log("Got msg with routing key ", msg.fields.routingKey + ", content : " +msg.content.toString());
  socket.emit(msg.fields.routingKey, msg.content);
}

module.exports=startWorker;
