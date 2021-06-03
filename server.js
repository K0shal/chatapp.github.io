var app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    },
});
var port = process.env.PORT || 3000;
const users = {};
io.on('connection', socket => {
    socket.on('new', name => {
        users[socket.id] = name;
        socket.broadcast.emit('others', name);
    });
    socket.on('message', data => {
        socket.broadcast.emit("receive", { message: data, name: users[socket.id] });
    });


});
http.listen(port);