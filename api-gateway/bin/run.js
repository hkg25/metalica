'use strict';
require('../config/config')
const http = require('http');

const api_gateway = require('../api_gateway');
const server = http.createServer(api_gateway);

server.listen(process.env.PORT);

server.on('listening', () => {
    console.log(`API gateway is listening on ${process.env.PORT}.`);
});