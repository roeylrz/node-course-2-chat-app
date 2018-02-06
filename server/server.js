const path = require('path'); //Dont neet to install it
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();//To enable configuration of Express application

app.use(express.static(publicPath));//To configure the Express Static Midleware

app.listen(port, () => {
    console.log(`Server is app in port ${port}`);
})