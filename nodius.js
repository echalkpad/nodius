require.paths.unshift(__dirname+'/lib/');
var logger = require('sys').log;
var echo = require('sys').puts;
var CircularBuffer = require('CircularBuffer').CircularBuffer;
var b = new CircularBuffer(4);

b.push("a");
b.push("b");
b.push("c");
b.push("d");
b.push("e");

b.each