import {MESSAGE,LOADING, PROGRESS, } from '../actions/types'

const initialState = {
	loading: false,
	progress: false,
	message: {
		isAlert: false,
		message: null,
	},	
}

export const appReducer = (state = initialState, action) => {
	switch (action.type){
		case MESSAGE: 
			return { ...state, 
				message: {
					...state.message, 
					isAlert: action.payload.alert, 
					message: action.payload.message,
				}
			}
		case LOADING: 
			return {...state, loading: action.payload}

		case PROGRESS: 
			return {...state, progress: action.payload}


		default: 
			return state
	}
}
