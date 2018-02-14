const path = require('path'); //Dont neet to install it
const http = require('http'); //Dont neet to install it
const express = require('express');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();//To enable configuration of Express application
var server = http.createServer(app);
var io = socketIO(server);//This way we can do everything we want in terms of emiting or listening to events
var users = new Users();
const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));//To configure the Express Static Midleware

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => { 
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        } 
        socket.join(params.room);//emit to everyone that have the join_parameter//To leave: socket.leave(room_name)
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList((params.room)));

        socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    //emit - socket has this method in order to emit events (and not listening to events like on)
    //socket.emit - emits event to a single connection
    // socket.emit('newMessage', {
    //     from: 'roey',
    //     text: 'Hey. How are you ?',
    //     createAt: 123123
    // }); 

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id)
        if (user && isRealString(message.text)) {
            //io.emit - emits event to every single connection
            //io.emit('newMessage', generateMessage(message.from, message.text));    
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        //socket.broadcast.emit - emits the event every users, except for this user(this socket)
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id); //To remove user from list when disconnecting
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    })
});


server.listen(port, () => {
    console.log(`Server is app in port ${port}`);
})