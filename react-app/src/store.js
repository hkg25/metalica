import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import tradesReducer from './reducers/tradeReducer';
import statusReducer from './reducers/statusReducer';
import refDataReducer from './reducers/refDataReducer';
import tradeFilterReducer from './reducers/tradeFilterReducer';

let appReducers = combineReducers({
	tradesState : tradesReducer,
	statusState : statusReducer,
	refDataState : refDataReducer,
	tradeFilterState : tradeFilterReducer
});

let store = createStore(appReducers, applyMiddleware(thunk));
export default store;
