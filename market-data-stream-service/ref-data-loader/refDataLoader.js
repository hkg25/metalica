const fetch = require('node-fetch');
const basePath = "http://localhost:9090/api/";
const url = basePath + "ref-data-service";
const type = 'commodity';

function loadCommodities(){
  return fetch(`${url}/${type}`)
  .then(function(response) {
      if (!response.ok) {
        throw new Error('Reference data service seems to be down');
      }               
      return response.json();
   }).
   catch(function(err) {
     console.log(`Unable to fetch ${type}`, err);
    return Promise.reject();
  });
  }

module.exports = loadCommodities;
