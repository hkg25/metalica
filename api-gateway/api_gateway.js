const express = require('express');
const request = require('superagent');

const api_gateway = express();

api_gateway.get('/:intent',(req,res,next) =>{
    const serviceIntent = req.params.intent;
    console.log(`API gateway GET /${serviceIntent} method invoked!`);
    request.get(`http://localhost:3010/registry/${serviceIntent}`).then((res) => {
        if(res){
            var serviceObj = {ip : res.ip, port : res.port};
            request.get(`http://${ip}:${port}/api/${serviceIntent}`).then((result) =>{
                res.json({result});
            }); 
        }
    }).catch( (err) =>{
        res.json(err);
    });       
});

module.exports = api_gateway;