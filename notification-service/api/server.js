require("../config/config");
const app = require('express')();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const Subscriber = require("./subscriber");

const PORT = process.env.PORT || 3000;


io.on('connection', function(socket){
  socket.on('notification', function(msg){
    var subscriber  = new Subscriber();
    subscriber.receiveMessage().then((msg)=>{
      io.emit('notification', msg);
    }).catch((err)=>{

    });
  });
});

httpServer.listen(PORT, function(){
  console.log(`listening on ${PORT}`);
});