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
    const formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    const formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
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