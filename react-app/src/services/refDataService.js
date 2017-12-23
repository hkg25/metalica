function loadCounterparties() {
    return load('counterparty');
  }
  
  function loadLocations() {
    return load('location');
  }
  
  function loadCommodities() {
    return load('commodity');
  }
  
  function load(typeToBeLoaded){

    // var response = await fetch('http://localhost:3001/service/details/refData');
    // if (!response.ok) {
    //   throw new Error('Service registry seems to be down');
    // }
    // var returnedValue = response.json();
    // var data = await fetch(`http://${returnedValue.ip}:${returnedValue.port}/refData/${typeToBeLoaded}`);

    return fetch('http://localhost:3001/service/details/refData')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Service registry seems to be down');
        }
        return response.json();
      })
      .then(function(returnedValue) {
           return fetch(`http://${returnedValue.ip}:${returnedValue.port}/refData/${typeToBeLoaded}`);
      })
      .then(function(responseNow) {
        return responseNow.json();
      }).catch(function(err) {
           console.log(`Unable to fetch ${typeToBeLoaded}`, err);
         return Promise.reject();
      });
  }
  
  
  let refDataService = {
      loadCommodities, loadCounterparties, loadLocations
  };
  
  export default refDataService;
  