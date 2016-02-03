var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {
    console.log('user connected via socket.io');
    
    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined',
            timestamp: now.valueOf()
        });
    });
    
    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);
        
        message.timestamp = now.valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);
    });
    
    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the Alvarado-Wong chat app!',
        timestamp: now.valueOf()
    });
});

http.listen(PORT, function () {
    console.log('Server started!');
});