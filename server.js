var io = require('socket.io');

var server = io.listen(4001);
var chat = server.of('/chat').on('connection', function(socket) {
  var now = Math.floor(new Date().getTime()/1000);
  chat.emit('user', {name: now});

  socket.on('disconnect', function() {
    chat.emit('message', {name: 'server', message: 'user disconnected'});
  });

  socket.on('say', function(data) {
    chat.emit('message', data);
  });

  socket.on('user name change', function(data) {
    var message = {name: 'server', message: data.o + ' is know known as ' + data.n};
    chat.emit('message', message);
  });
});

