var connect = require('connect'),
    colors = require('colors'),
    io = require('socket.io'),
    path = require('path'),
    http = require('http'),
    open = require('open');

// might want to add supervisor for view reloads

var socket;

exports.start = function(directory){

  // config
  var port = 3000;
  var public_dir = path.join(directory, 'public');

  var app = connect().use(connect.logger('dev')).use(connect.static(public_dir));
  console.log(('\nserver started on port ' + port + '\n').green);

  var server = http.createServer(app).listen(port);
  open('http://localhost:' + port);

  var socketio = io.listen(server);

  socketio.sockets.on('connection', function(sock){
    socket = sock;
    socket.emit('connected', true);
  });

}

exports.reload = function(){ socket.emit('reload', true); }