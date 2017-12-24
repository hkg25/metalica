//const config = require('Config');
const basePath = "http://localhost:9000/api/";
const url = basePath + "ref-data-service";

function loadCounterparties() {
  return load('counterparty');
}
  
function loadLocations() {
  return load('location');
}
  
function loadCommodities() {
  return load('commodity');
}
  
function load(type){
    return fetch(`${url}/${type}`)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Service registry seems to be down');
        }
        return response.json();
      }).catch(function(err) {
           console.log(`Unable to fetch ${type}`, err);
         return Promise.reject();
      });
}
    
let refDataService = {
  loadCommodities, loadCounterparties, loadLocations
};
  
export default refDataService;
  