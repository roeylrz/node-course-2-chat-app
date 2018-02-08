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

socket.on('newMessage', function(message){
    console.log('newMessage', message);
    let li = jQuery('<li></li>');//Create new element
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name="message"]').val()//[name="message"] - to get <input name="message" type="text" placeholder="Message" /> from index.html;
    }, function () {

    });
});