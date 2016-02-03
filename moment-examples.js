var moment = require('moment');
var now = moment();

console.log(now.format());
console.log(now.format('X'));//display in Epoch, seconds
console.log(now.format('x'));//display in Epoch, miliseconds
console.log(now.valueOf());//Epoch, miliseconds output as number

//var timestamp = 1444247486704;
var timestamp = now.valueOf();
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.format('h:mma'));

/*now.subtract(1, 'year');//remove a year from Now
console.log(now.format());
console.log(now.format('MMM Do YYYY, h:mma'));*/

