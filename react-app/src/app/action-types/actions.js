import * as ActionTypes from "./ActionTypes";
const TRADE_URL = "http://localhost:7070/api/products";

export const addTrade = (trade) => {
    return {
        type: ActionTypes.ADD_TRADE,
        payload: {
            item: {
            }
        }
    }
}


export const removeTrade = (id) => {
       return {
        type: ActionTypes.REMOVE_TRADE,
        payload: {
            id: id
        }
    }
}


export const updateTrade = (id, qty) => {
    return {
        type: ActionTypes.UPDATE_TRADE,
        payload: {
            id: id
        }
    }
}


export function initTrades(trades) {
    return {
        type: ActionTypes.INIT_TRADES,
        payload: {
            trades: trades
        }
    }
}

export function loading (status) {
    return {
        type: ActionTypes.LOADING,
        payload: {
            loading: status
        }
    }
}


export function initError(error) {
    return {
        type: ActionTypes.INIT_ERROR,
        payload: {
            error: error
        }
    }
}

export function fetchTrades(){

    return function(dispatch){
        dispatch(loading(true));
        fetch(TRADE_URL).then(response => {
            return response.json();
        }).then(trades => {
            let action = initTrades(trades);
            dispatch(action);
            dispatch(loading(false));
        }).catch(err =>{
            dispatch(loading(false));
        });

    }

}