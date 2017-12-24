//const config = require('Config');
const basePath = "http://localhost:9000/api/";
const url = basePath + "trade-service/trades";

function load(){
    return fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Service registry seems to be down');
        }
        return response.json();
      }).catch(function(err) {
           console.log("Unable to fetch trades.", err);
         return Promise.reject();
      });
  }
  
  function deleteTrade(id) {
    return fetch(`${url}/${id}`,{method:'delete'})
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Service registry seems to be down');
        }
        return response.json();
      }).catch(function(err) {
           console.log("Unable to delete trade " + id, err);
         return Promise.reject();// [];
      });
  }
  
  function createNew(trade){
    return fetch(`${url}`,{
      method:'post',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
      body:JSON.stringify(trade)
    }).then(function(response) {
        if (!response.ok) {
          return Promise.reject(response.text());
        }
        return response.json();
      }).catch(function(err) {
           console.log("Unable to create new trade ", err);
         return Promise.reject(err);// [];
      });
  }
  
  function update(trade){
    return fetch(`${url}`, {
      method:'put',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
      body:JSON.stringify(trade)
    }).then(function(response) {
        if (!response.ok) {
          return Promise.reject(response.text());
        }
        return response.json();
      }).catch(function(err) {
           console.log("Unable to update trade " + trade.id, err);
         return Promise.reject(err);// [];
      });
  }
  
  let tradesService = {
      load, createNew, deleteTrade,update
  };
  
  export default tradesService;
  