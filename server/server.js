const path = require('path'); //Dont neet to install it
const http = require('http'); //Dont neet to install it
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();//To enable configuration of Express application
var server = http.createServer(app);
var io = socketIO(server);//This way we can do everything we want in terms of emiting or listening to events

app.use(express.static(publicPath));//To configure the Express Static Midleware

io.on('connection', (socket) => {
    console.log('New user connected');

    //emit - socket has this method in order to emit events (and not listening to events like on)
    //socket.emit - emits event to a single connection
    // socket.emit('newMessage', {
    //     from: 'roey',
    //     text: 'Hey. How are you ?',
    //     createAt: 123123
    // }); 

    socket.on('createMessage', (message) => {
        console.log('create message', message);
    //io.emit - emits event to every single connection
    io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});


server.listen(port, () => {
    console.log(`Server is app in port ${port}`);
})