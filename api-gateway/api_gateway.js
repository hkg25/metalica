const express = require('express');
const request = require('superagent');

const discovery = require('./discovery');

console.log(discovery);

const api_gateway = express();

api_gateway.get('/:intent',(req,res,next) =>{
    const serviceIntent = req.params.intent;
    console.log(`${req.method} /${serviceIntent} request received !`);

    const {serviceIp, servicePort} = await discovery(serviceIntent);
    console.log(`ip ${serviceIp} & port ${servicePort}`);

    request.get(`http://${serviceIp}:${servicePort}/api/${serviceIntent}`).then((result) =>{
        if(result)
            res.json({err:{ message:`Failed to get response from ${serviceIntent} api !`}});
        res.json({result});
    });           
});

module.exports = api_gateway;