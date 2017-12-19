function statusReducer(currentState = {loading : false, deleting: false, saving:false, error: false, errorMessage: null}, action){
	if(action.type === 'LOADING'){
		return { loading : true, deleting:false, saving:false, error: false, errorMessage: null};
	}
	if(action.type === 'SAVING'){
		return { loading : false, deleting:false, saving:true, error: false, errorMessage: null};
	}
	if (action.type === 'DELETING_TRADE'){
		return { deleting : true, loading:false, saving:false, error: false, errorMessage: null};
	}
	if (action.type === 'DONE'){
		return { loading : false, deleting:false, saving:false, error: false, errorMessage: null};
	}
	if (action.type === 'ERROR'){
		return { loading : false, deleting:false, saving:false, error:true, errorMessage:action.payload};
	}

	return currentState;
}
export default statusReducer;
