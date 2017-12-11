const request = require('request');

var appRouter = function(app) {

    app.get("/:intent", (req, res) => {
        const serviceIntent = req.params.intent;
        console.log(`${req.method} /${serviceIntent} request received !`);
        request.get(`${process.env.SERVICE_REGISTRY_ENDPOINT}/${serviceIntent}`, (err, response, body) => {
            if(err)
                return res.send({"status": "error", "message": `Failed to discover service for ${serviceIntent} intent : ${err}`});
            const {ip, port} = JSON.parse(body);
            console.log(`Service for ${serviceIntent} intent is discovered at ${ip}:${port}`);            
            request.get(`http://${ip}:${port}/api/${serviceIntent}`, (err,response,body) =>{
                if(err)
                    return res.send({"status": "error", "message": `Failed to get the response form ${serviceIntent} service : ${err}`});
                return res.send(JSON.parse(body));
            }); 
        });
    });

    app.post("/:intent", (req, res) => {
        const serviceIntent = req.params.intent;
        console.log(`${req.method} /${serviceIntent} request received !`);
        request.get(`${process.env.SERVICE_REGISTRY_ENDPOINT}/${serviceIntent}`, (err, response, body) => {
            if(err)
                return res.send({"status": "error", "message": `Failed to discover service for ${serviceIntent} intent : ${err}`});
            const {ip, port} = JSON.parse(body);
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
        });
    });
}
    
module.exports = appRouter;