//io() - we can use it after loading the library socket.io (script src="/socket.io/socket.io.js"). 
//when we call it we initiate the request from the client to the server to open up a web socket and keep that connection open.
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server')

    // socket.emit('createMessage', {
    //     from: 'orli',
    //     text: 'Hey, how are you ?'
    // });
});
socket.on('disconnect',function () {
    console.log('Disconnected from server')
});
socket.on('newMessage', function(createMessage){
    console.log('newMessage', createMessage);
})