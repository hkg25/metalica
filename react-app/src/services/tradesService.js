function load(){
    return fetch('http://localhost:3001/service/details/trades')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Service registry seems to be down');
        }
        return response.json();
      })
      .then(function(returnedValue) {
           return fetch(`http://${returnedValue.ip}:${returnedValue.port}/trades`);
      })
      .then(function(responseNow) {
        return responseNow.json();
      }).catch(function(err) {
           console.log("Unable to fetch trades.", err);
         return Promise.reject();
      });
  }
  
  function deleteTrade(id) {
    return fetch('http://localhost:3001/service/details/trades')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Service registry seems to be down');
        }
        return response.json();
      })
      .then(function(returnedValue) {
           return fetch(`http://${returnedValue.ip}:${returnedValue.port}/trades/${id}`, {
           method:'delete'
         });
      })
      .then(function(responseNow) {
        return responseNow.json();
      }).catch(function(err) {
           console.log("Unable to delete trade " + id, err);
         return Promise.reject();// [];
      });
  }
  
  function createNew(trade){
    return fetch('http://localhost:3001/service/details/trades')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Service registry seems to be down');
        }
        return response.json();
      })
      .then(function(returnedValue) {
           return fetch(`http://${returnedValue.ip}:${returnedValue.port}/trades/`, {
           method:'post',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
           body:JSON.stringify(trade)
         });
      })
      .then(function(responseNow) {
        if (!responseNow.ok) {
          return Promise.reject(responseNow.text());
        }
        return responseNow.json();
      }).catch(function(err) {
           console.log("Unable to create new trade ", err);
         return Promise.reject(err);// [];
      });
  }
  
  function update(trade){
    return fetch('http://localhost:3001/service/details/trades')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Service registry seems to be down');
        }
        return response.json();
      })
      .then(function(returnedValue) {
           return fetch(`http://${returnedValue.ip}:${returnedValue.port}/trades/${trade.id}`, {
           method:'put',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
           body:JSON.stringify(trade)
         });
      })
      .then(function(responseNow) {
        if (!responseNow.ok) {
          return Promise.reject(responseNow.text());
        }
        return responseNow.json();
      }).catch(function(err) {
           console.log("Unable to update trade " + trade.id, err);
         return Promise.reject(err);// [];
      });
  }
  
  let tradesService = {
      load, createNew, deleteTrade,update
  };
  
  export default tradesService;
  