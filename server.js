const express = require('express');

const getBalance = require('./src/balance/get');
const postEvent = require('./src/event/post');
const postReset = require('./src/reset/post');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get('/balance', getBalance);
server.post('/event', postEvent);
server.post('/reset', postReset);

module.exports = server;
