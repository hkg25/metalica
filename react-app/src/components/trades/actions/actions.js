import * as ActionTypes from "./ActionTypes";
import tradesService from '../../../services/tradesService';
import refDataService from '../../../services/refDataService';

export const cancelSave = () => {
    return { type: 'CANCEL_SAVE' }
}

export const clearTradeFilters = (obj) => {
    return { type: 'CLEAR_TRADE_FILTERS' }
}

export const createNewAction = (trade) => {
    return { type: 'CREATE_NEW', trade }
}

export const editTrade = (id) => {
    return { type: 'EDIT_TRADE', payload: id }
}

export const filterTrades = (obj) => {
    return { type: 'FILTER_TRADES' }
}

export const selectTrade = (id) => {
    return { type: 'SELECT_TRADE', payload: id }
}

export const sortTrades = (key) => {
    return { type: 'SORT_TRADES', payload: key }
}

export const saveTrade = (trade) => {
	return function(dispatch){
		dispatch({
			type : 'SAVING'
		});
		if (!trade.id || trade.id == -1) {
			delete trade.id;
			delete trade._id;
			tradesService
				.createNew(trade)
				.then(savedTrade => dispatch({
					type : 'ADD_NEW',
					payload : savedTrade
				}))
				.then(() => dispatch({
					type : 'DONE'
				}))
				.catch((err) =>
					{

						dispatch({
							type: 'ERROR', payload: 'Error while ceating new trade, looks like trading service is down or validations have failed'
						})
					});
		} else {
			tradesService
				.update(trade)
				.then(savedTrade => dispatch({
					type : 'UPDATE_TRADE',
					payload : savedTrade
				}))
				.then(() => dispatch({
					type : 'DONE'
				}))
				.catch(() => dispatch({
					type: 'ERROR', payload:'Error while updating a trade, looks like trading service is down'
				}));
		}
	}
}

export const deleteTrade = (id) => {
	return function(dispatch){
		dispatch({
			type : 'DELETING_TRADE'
		});
		tradesService
			.deleteTrade(id)
			.then(trade => dispatch({
				type : 'DELETED_TRADE',
				payload : id
			}))
			.then(() => dispatch({
				type : 'DONE'
			}))
			.catch((err) => dispatch({
				type: 'ERROR', payload:'Error while deleting a trade, looks like trading service is down'
			}));
	}
}

export function load() {
	return function(dispatch) {
		dispatch({
			type : 'LOADING'
		});
		refDataService.loadCommodities().then(commodities => dispatch({
			type : 'LOAD_COMMODITIES',
			payload : {commodities:commodities.commodities}
		})).catch(() => dispatch({
			type: 'ERROR', payload:'Error while loading reference data for commodities, looks like reference data service is down or service registry might be down'
		}));
		refDataService.loadCounterparties().then(counterparties => dispatch({
			type : 'LOAD_COUNTERPARTIES',
			payload : {counterparties:counterparties.counterParties}
		})).catch(() => dispatch({
			type: 'ERROR', payload:'Error while loading reference data for counterparties, looks like reference data service is down or service registry might be down'
		}));
		refDataService.loadLocations().then(locations => dispatch({
			type : 'LOAD_LOCATIONS',
			payload : {locations:locations.locations}
		})).catch(() => dispatch({
			type: 'ERROR', payload:'Error while loading reference data for locations, looks like reference data service is down or service registry might be down'
		}));
		tradesService
			.load()
			.then(trades => dispatch({
				type : 'LOAD',
				payload : trades.trades
			}))
			.then(() => dispatch({
				type : 'DONE'
			}))
			.catch(() => dispatch({
				type: 'ERROR', payload:'Error while loading trades, looks like trading service is down or service registry might be down'
			}));
	}
}


