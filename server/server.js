const path = require('path'); //Dont neet to install it
const http = require('http'); //Dont neet to install it
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();//To enable configuration of Express application
var server = http.createServer(app);
var io = socketIO(server);//This way we can do everything we want in terms of emiting or listening to events
const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));//To configure the Express Static Midleware

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    //emit - socket has this method in order to emit events (and not listening to events like on)
    //socket.emit - emits event to a single connection
    // socket.emit('newMessage', {
    //     from: 'roey',
    //     text: 'Hey. How are you ?',
    //     createAt: 123123
    // }); 

    socket.on('createMessage', (message, callback) => {
        console.log('create message', message);
        //io.emit - emits event to every single connection
        io.emit('newMessage', generateMessage(message.from, message.text));
        //socket.broadcast.emit - emits the event every users, except for this user(this socket)
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});


server.listen(port, () => {
    console.log(`Server is app in port ${port}`);
})