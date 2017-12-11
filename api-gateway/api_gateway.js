const express = require('express');
const request = require('superagent');

const api_gateway = express();

api_gateway.get('/:intent',(req,res,next) =>{
    const serviceIntent = req.params.intent;
    console.log(`${req.method} /${serviceIntent} request received !`);
    request.get(`${SERVICE_REGISTRY_ENDPOINT}/${serviceIntent}`).then((result) => {
        if(result)
            res.json(`Failed to get service endpoint using service registry : ${SERVICE_REGISTRY_ENDPOINT} !`);
        const {serviceIp, servicePort} = result;
        request.get(`http://${serviceIp}:${servicePort}/api/${serviceIntent}`).then((result) =>{
            if(result)
                res.json(`Failed to get response from ${serviceIntent} api !`);
            res.json({result});
        }); 
    }).catch( (err) =>{
        res.json(err);
    });       
});

module.exports = api_gateway;