'use strict';

const express = require('express');
const service = express();

const ServiceRegistry = require('./serviceRegistry');
const serviceRegistry = new ServiceRegistry();

service.put('/registry/:intent/:port', (req,res,next) => {
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;

    const serviceIp = req.connection.remoteAddress.includes('::') ?
        `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    serviceRegistry.add(serviceIntent,serviceIp,servicePort);
    res.send({result:`Added service for intent ${serviceIntent} at ${serviceIp}:${servicePort}`});
});

service.get('/registry/:intent', (req,res,next) => {
    const serviceIntent = req.params.intent;
    const result = serviceRegistry.get(serviceIntent);
    if(!result)
        res.send({status: "error",message: `Failed to discover ${serviceIntent} api service !`});  
    else{
        const {ip, port} = result;
        console.log(`${serviceIntent} service is running at ${ip}:${port}`);  
        res.send({ip,port});
    }
});

service.delete('/registry/:intent/:port', (req,res,next) => {
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;

    const serviceIp = req.connection.remoteAddress.includes('::') ?
        `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    serviceRegistry.remove(serviceIntent,serviceIp,servicePort);
    res.send({result:`Removed service for intent ${serviceIntent} at ${serviceIp}:${servicePort}`});
});

module.exports = service;