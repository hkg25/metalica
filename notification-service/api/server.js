require("../config/config");
var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);
const PORT = process.env.PORT || 3000;


io.on('connection', function(socket){
  socket.on('notification', function(msg){
    io.emit('notification', msg);
  });
});

httpServer.listen(PORT, function(){
  console.log(`listening on ${PORT}`);
});