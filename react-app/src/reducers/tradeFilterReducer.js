var initialState = {
    filtered: false,
    trades: [],
    selectedFilter: {
        startTradeDate: '',
        endTradeDate: '',
        commodity: '',
        side: '',
        counterparty: '',
        location: ''
    },
    clicked:false
};

function tradeFilterReducer(currentState = initialState, action) {
    console.log(currentState);
		if (action.type === 'CLEAR_TRADE_FILTERS') {
      return Object.assign({}, initialState, {trades:[]});
    }
    if (action.type === 'FILTER_TRADES') {
      return filterTrades(currentState, action.payload);
    }
		return currentState;
}

function filterTrades(state,filteredCriteria) {
    let filteredTrades = [...state.trades];
    console.log("Trades " + filteredTrades);
    filteredTrades = filteredTrades.filter((item) => item.commodity === filteredCriteria.commodity);
    let updatedProps = {
      filtered: true,
      trades: filteredTrades,
     };
     return Object.assign({}, state, updatedProps);
}

export default tradeFilterReducer;
