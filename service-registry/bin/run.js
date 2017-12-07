'use strict';
require('../config/config')
const http = require('http');

const service = require('../service');
const server = http.createServer(service);

server.listen(process.env.PORT);

server.on('listening', () => {
    console.log(`Service Registry is listening on ${process.env.PORT}.`);
});