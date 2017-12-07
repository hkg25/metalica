'use strict';

const express = require('express');
const service = express();

const ServiceRegistry = require('./ServiceRegistry');
const serviceRegistry = new ServiceRegistry();

service.put('/registry/:intent/:port', (req,res,next) => {
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;

    const serviceIp = req.connection.remoteAddress.includes('::') ?
        `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    serviceRegistry.add(serviceIntent,serviceIp,servicePort);
    res.json({result:`${serviceIntent} at ${serviceIp}:${servicePort}`});
});

service.get('/registry/:intent', (req,res,next) => {
    const serviceIntent = req.params.intent;
    const {ip,port} = serviceRegistry.get(serviceIntent);
    res.json({result:{ip,port}});
});

service.delete('/registry/:intent/:port', (req,res,next) => {
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;

    const serviceIp = req.connection.remoteAddress.includes('::') ?
        `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    serviceRegistry.remove(serviceIntent,serviceIp,servicePort);
    res.json({result:`Removed service ${serviceIntent} at ${serviceIp}:${servicePort}`});
});

module.exports = service;