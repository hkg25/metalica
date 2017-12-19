const initialState = {
    counterparties: [],
    locations: [],
    commodities: []
};

function refDataReducer(currentState = initialState, action){
	  if (action.type === 'LOAD_COMMODITIES') {
      return Object.assign({}, currentState, {commodities:action.payload.commodities});
    }
    if (action.type === 'LOAD_COUNTERPARTIES') {
      return Object.assign({}, currentState, {counterparties:action.payload.counterparties});
    }
    if (action.type === 'LOAD_LOCATIONS') {
      return Object.assign({}, currentState, {locations:action.payload.locations});
    }

		return currentState;
}

export default refDataReducer;
