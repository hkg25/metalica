import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";



function tradeReducer(state=100,action){
    switch (action.type) {
        // case INCREMENT : 
        //     return state + action.payload.value;
        // case DECREMENT : 
        //     return state + action.payload.value;
        // case RESET :
        //     return 0;
        default:
            return state;
    }
}


let rootReducer = combineReducers({
    trade : tradeReducer
})

let store =  createStore(rootReducer, 
                        applyMiddleware(thunk));

export default store;