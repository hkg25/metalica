const initialState = {
    isDescending: false,
    orderBy: 'tradeDate',
    trades: [],
    selectedTrade: null,
    editMode : false,
    actionToBePerformed: 'load'
};

function orderedTrades(trades, comparer) {
    return  trades.sort(comparer);
}

function saveTrade(state, trade) {
  	let finalTrades = [...state.trades, trade];
    var isDescending = findIsIDescending(state, state.orderBy);
    let comparer = getComparer(state.orderBy, isDescending);

    let updatedProps = {
          trades: orderedTrades(finalTrades, comparer),
          selectedTrade: trade,
          editMode : false,
          actionToBePerformed:'Save_Trade'
    };
    return Object.assign({}, state, updatedProps);
}

function updateTrade(state, updatedTrade) {
  let nonUpdatedTrades = state.trades.filter(trade => trade.id !== updatedTrade.id);

  	let finalTrades = [...nonUpdatedTrades, updatedTrade];
    var isDescending = findIsIDescending(state, state.orderBy);
    let comparer = getComparer(state.orderBy, isDescending);

    let updatedProps = {
          trades: orderedTrades(finalTrades, comparer),
          selectedTrade: updatedTrade,
          editMode : false,
          actionToBePerformed:'Save_Trade'
    };
    return Object.assign({}, state, updatedProps);
}

function deleteTrade(state, id) {
    let updatedTrades = state.trades.filter(trade => trade.id !== id);
    //let selectedTrade = state.trades.filter(trade => trade.id == id)[0];
    var isDescending = findIsIDescending(state, state.orderBy);
    let comparer = getComparer(state.orderBy, isDescending);

    let updatedProps = {
        trades: orderedTrades(updatedTrades, comparer),
        selectedTrade: null,
        editMode : false,
        actionToBePerformed:'Delete_Trade'
    };
    return Object.assign({}, state, updatedProps);
}

function selectTrade(state, id) {
    let selectedTrade = state.trades.filter(trade => trade.id === id)[0];
    return populatedSelectedTrade(state, selectedTrade, false, 'Select_Trade');
}

function populatedSelectedTrade(state, selectedTrade, editMode, actionToBePerformed) {
    let updatedProps = {
        selectedTrade: selectedTrade,
        editMode : editMode,
        actionToBePerformed:actionToBePerformed
    };
    return Object.assign({}, state, updatedProps);
}

function tradesReducer(currentState = initialState, action){
		if (action.type === 'LOAD') {
      let comparer = getComparer(initialState.orderBy, false);
			return Object.assign({}, currentState, {editMode:false, actionToBePerformed: 'load', isDescending : false,
        orderBy: initialState.orderBy, trades : orderedTrades(action.payload, comparer)});
		}
		if (action.type === 'ADD_NEW') {
			return saveTrade(currentState, action.payload);
		}
    if (action.type === 'UPDATE_TRADE') {
      return updateTrade(currentState, action.payload);
    }
		if (action.type === 'DELETED_TRADE') {
			return deleteTrade(currentState, action.payload);
		}
    if (action.type === 'DELETING_TRADE'){
  		return Object.assign({}, currentState, {actionToBePerformed:'Delete_Trade', editMode: false});
  	}
    if (action.type === 'SELECT_TRADE') {
			return selectTrade(currentState, action.payload);
		}
    if (action.type === 'EDIT_TRADE') {
      return populatedSelectedTrade(currentState, currentState.selectedTrade, true, 'Create_New');
    }
    if (action.type === 'CREATE_NEW') {
      return populatedSelectedTrade(currentState, action.payload, true, 'Create_New');
    }
    if (action.type === 'CANCEL_SAVE') {
      //  return Object.assign({}, currentState, {editMode:false, actionToBePerformed:'Cancel'});
        return populatedSelectedTrade(currentState, currentState.selectedTrade, false, 'Cancel');
    }
    if (action.type === 'SORT_TRADES') {
      var toBeOrderedBy = action.payload;
      var isDescendingHere = findIsIDescending(currentState, toBeOrderedBy);
      let comparer = getComparer(toBeOrderedBy, isDescendingHere);

      return Object.assign({}, currentState, {editMode:false, actionToBePerformed:'Sort_Trades', selectedTrade : null, isDescending : isDescendingHere, orderBy: toBeOrderedBy, trades : orderedTrades(currentState.trades, comparer)});
		}
		return currentState;
	}

function findIsIDescending(currentState, toBeOrderedBy) {
  var isDescending = currentState.isDescending;
  if (currentState.orderBy === toBeOrderedBy) {
      isDescending = !isDescending;
  }
  return isDescending;
}

function getComparer(attrName, isDescending){
	var compareFn = function(item1, item2){
		if (item1[attrName] < item2[attrName]) return -1;
		if (item1[attrName] > item2[attrName]) return 1;
		return 0;
	}
  if (isDescending) {
    return getDescending(compareFn);
  }
  return compareFn;
}

function getDescending(comparer){
	return function(){
		return comparer.apply(undefined, arguments) * -1;
	}
}
export default tradesReducer;
