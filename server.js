var io = require('socket.io').listen(4001),
    twitter = require('twitter-node');

var t = new twitter.TwitterNode({
  user: 'annoyed_penguin', 
  password: 'mobs18"injurer'
})

t.track('3sq');

t.headers['User-Agent'] = 'brains!!!';

io.sockets.on('connection', function(socket) {
  socket.emit('news', {hello: 'world'});

  t.addListener('tweet', function(tweet) {
    socket.emit('tweet', tweet);
  });

  socket.on('test event', function(data) {
    console.log(data);
  });
});

