import * as ActionTypes from "./ActionTypes";
import tradesService from '../../../services/tradesService';
import refDataService from '../../../services/refDataService';

export const cancelSave = () => {
    return { type: ActionTypes.CANCEL_SAVE }
}

export const clearTradeFilters = (obj) => {
    return { type: ActionTypes.CLEAR_TRADE_FILTERS }
}

export const createNewAction = (trade) => {
    return { type: ActionTypes.CREATE_NEW, trade }
}

export const editTrade = (id) => {
    return { type: ActionTypes.EDIT_TRADE, payload: id }
}

export const filterTrades = (obj) => {
    return { type: ActionTypes.FILTER_TRADES }
}

export const selectTrade = (id) => {
    return { type: ActionTypes.SELECT_TRADE, payload: id }
}

export const sortTrades = (key) => {
    return { type: ActionTypes.SORT_TRADES, payload: key }
}


export function load() {
	return function(dispatch) {
		dispatch({
			type : 'LOADING'
		});
		refDataService.loadCommodities().then(commodities => dispatch({
			type : 'LOAD_COMMODITIES',
			payload : {commodities:commodities}
		})).catch(() => dispatch({
			type: 'ERROR', payload:'Error while loading reference data for commodities, looks like reference data service is down or service registry might be down'
		}));
		refDataService.loadCounterparties().then(counterparties => dispatch({
			type : 'LOAD_COUNTERPARTIES',
			payload : {counterparties:counterparties}
		})).catch(() => dispatch({
			type: 'ERROR', payload:'Error while loading reference data for counterparties, looks like reference data service is down or service registry might be down'
		}));
		refDataService.loadLocations().then(locations => dispatch({
			type : 'LOAD_LOCATIONS',
			payload : {locations:locations}
		})).catch(() => dispatch({
			type: 'ERROR', payload:'Error while loading reference data for locations, looks like reference data service is down or service registry might be down'
		}));
		tradesService
			.load()
			.then(trades => dispatch({
				type : 'LOAD',
				payload : trades
			}))
			.then(() => dispatch({
				type : 'DONE'
			}))
			.catch(() => dispatch({
				type: 'ERROR', payload:'Error while loading trades, looks like trading service is down or service registry might be down'
			}));
	}
}


