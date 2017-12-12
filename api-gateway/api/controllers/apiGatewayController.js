'use strict';
const request = require('request');

exports.get_all = function(req, res) {
  const serviceIntent = req.params.intent;
  console.log(`${req.method} /${serviceIntent} request received !`);
  request.get(`${process.env.SERVICE_REGISTRY_ENDPOINT}/${serviceIntent}`, (err, response, body) => {
      if(err)
          return res.send({"status": "error", "message": `Failed to discover service for ${serviceIntent} intent : ${err}`});
      const {ip, port} = body;
      console.log(`Service for ${serviceIntent} intent is discovered at ${ip}:${port}`);            
      request.get(`http://${ip}:${port}/api/${serviceIntent}`, (err,response,body) =>{
          if(err)
              return res.send({"status": "error", "message": `Failed to get the response form ${serviceIntent} service : ${err}`});
          return res.send(body);
      }); 
  });
};

exports.create = function(req, res) {
  const serviceIntent = req.params.intent;
  console.log(`${req.method} /${serviceIntent} request received !`);
  request.get(`${process.env.SERVICE_REGISTRY_ENDPOINT}/${serviceIntent}`, (err, response, body) => {
    if(err)
          return res.send({"status": "error", "message": `Failed to discover service for ${serviceIntent} intent : ${err}`});
    if (body.status === 'error')
          return res.send(body);
    else {
            const {ip, port} = body;
            console.log(`Service for ${serviceIntent} intent is discovered at ${ip}:${port}`); 
            request({
                url: `http://${ip}:${port}/api/${serviceIntent}`,
                method: "POST",
                json: req.body
            },(err,response,body) =>{
                if(err)
                    return res.send({"status": "error", "message": `Failed to get the response form ${serviceIntent} service : ${err}`});
                res.send(body);
            }); 
        }
  });
};

exports.get = function(req, res) {
  const serviceIntent = req.params.intent;
  const id = req.params.id;

  console.log(`${req.method} /${serviceIntent}/${id} request received !`);
  request.get(`${process.env.SERVICE_REGISTRY_ENDPOINT}/${serviceIntent}`, (err, response, body) => {
      if(err)
          return res.send({"status": "error", "message": `Failed to discover service for ${serviceIntent} intent : ${err}`});
      const {ip, port} = body;
      console.log(`Service for ${serviceIntent} intent is discovered at ${ip}:${port}`); 
      request.get(`http://${ip}:${port}/api/${serviceIntent}/${id}`, (err,response,body) =>{
          if(err)
              return res.send({"status": "error", "message": `Failed to get the response form ${serviceIntent} service : ${err}`});
          return res.send(body);
      }); 
  });
};

exports.update = function(req, res) {
  const serviceIntent = req.params.intent;
  const id = req.params.id;

  console.log(`${req.method} /${serviceIntent}/${id} request received !`);
  request.put(`${process.env.SERVICE_REGISTRY_ENDPOINT}/${serviceIntent}`, (err, response, body) => {
      if(err)
          return res.send({"status": "error", "message": `Failed to discover service for ${serviceIntent} intent : ${err}`});
      const {ip, port} = body;
      console.log(`Service for ${serviceIntent} intent is discovered at ${ip}:${port}`); 
      request({
          url: `http://${ip}:${port}/api/${serviceIntent}/${id}`,
          method: "PUT",
          json: req.body
      },(err,response,body) =>{
          if(err)
              return res.send({"status": "error", "message": `Failed to get the response form ${serviceIntent} service : ${err}`});
          res.send(body);
      });  
  });
};

exports.delete = function(req, res) {
  const serviceIntent = req.params.intent;
  const id = req.params.id;

  console.log(`${req.method} /${serviceIntent}/${id} request received !`);
  request.get(`${process.env.SERVICE_REGISTRY_ENDPOINT}/${serviceIntent}`, (err, response, body) => {
      if(err)
          return res.send({"status": "error", "message": `Failed to discover service for ${serviceIntent} intent : ${err}`});
      const {ip, port} = body;
      console.log(`Service for ${serviceIntent} intent is discovered at ${ip}:${port}`); 
      request.delete(`http://${ip}:${port}/api/${serviceIntent}/${id}`, (err,response,body) =>{
          if(err)
              return res.send({"status": "error", "message": `Failed to get the response form ${serviceIntent} service : ${err}`});
          return res.send(body);
      }); 
  });
};