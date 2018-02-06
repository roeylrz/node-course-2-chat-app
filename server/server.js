const path = require('path'); //Dont neet to install it
const http = require('http'); //Dont neet to install it
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();//To enable configuration of Express application
var server = http.createServer(app);
var io = socketIO(server);//This way we can do everything we want in terms of emmiting or listening to events

app.use(express.static(publicPath));//To configure the Express Static Midleware

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});


server.listen(port, () => {
    console.log(`Server is app in port ${port}`);
})