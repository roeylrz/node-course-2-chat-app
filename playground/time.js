const moment = require('moment');

// var date = new Date();
// var month = ['']
// console.log(date.getMonth());

var date = moment();//Create new moment object that repreasent the current point in time

//date.add(100, 'years').subtract(9, 'months');

console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));