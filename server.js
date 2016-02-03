var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('user connected via socket.io');
    
    socket.on('message', function (message) {
        var timestamp = now.valueOf();
        var timestampMoment = moment.utc(timestamp);
        message.text = timestampMoment.local().format('h:mma') + ': ' + message.text;
        
        console.log('Message received: ' + message.text);
        
        io.emit('message', message);
    });
    
    socket.emit('message', {
        text: 'Welcome to the chat application!'
    });
});

http.listen(PORT, function () {
    console.log('Server started!');
});