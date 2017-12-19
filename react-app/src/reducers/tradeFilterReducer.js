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
		if (action.type === 'CLEAR_TRADE_FILTERS') {
      return Object.assign({}, initialState, {trades:[]});
    }
    if (action.type === 'FILTER_TRADES') {
      return Object.assign({}, initialState);
    }
		return currentState;
}

export default tradeFilterReducer;
