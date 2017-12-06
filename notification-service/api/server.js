var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);
const PORT = process.env.PORT || 3000;


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

httpServer.listen(PORT, function(){
  console.log(`listening on ${PORT}`);
});