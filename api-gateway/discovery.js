const request = require('superagent');

module.exports.discovery = async function(serviceIntent){
    return new Promise(function(resolveFn, rejectFn){
        request.get(`${SERVICE_REGISTRY_ENDPOINT}/registry/${serviceIntent}`).then((result) => {
            if(result)
                rejectFn(`Failed to get service endpoint using service registry : ${SERVICE_REGISTRY_ENDPOINT} !`);
            console.log(result);
            const {serviceIp, servicePort} = result;
            resolveFn({serviceIp, servicePort});
        }).catch( (err) =>{
            rejectFn(err);
        }); 
    });      
}