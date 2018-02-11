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
    jQuery('#messages').append(li); //# - using '#' for ID
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');//target="_black" - tells the browser to open up the url in a new tab instead of redirecting the current tab.

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li); //# - using '#' for ID
});

jQuery('#message-form').on('submit', function(e){//# - using '#' for ID
    e.preventDefault();

    let messageTextbox = jQuery('[name="message"]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()//[name="message"] - to get <input name="message" type="text" placeholder="Message" /> from index.html;
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');//# - using '#' for ID
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');//attr - allows us to set the attribute

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to get location');
    });
});