'use strict';

var util = require('util');
var stream = require('stream');

var BufferStream = (module.exports = function(opts) {
    opts = opts || {};

    stream.Transform.call(this, opts);
    var size = 0;

    var data = [];

    this.getContents = function() {
        return Buffer.concat(data, size);
    };

    this._transform = function(chunk, encoding, callback) {
        data.push(chunk);
        size += chunk.length;
        callback(null, chunk);
    };

    this._flush = function(callback) {
        callback();
    };
});

util.inherits(BufferStream, stream.Transform);
