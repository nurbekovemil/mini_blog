import {LOGIN, LOGOUT, AUTH, UPDATE_USER_PICTURE, UPDATE_USER, EDITING, AUTHLOADING} from '../actions/types'

const initialState = {
	isAuth: false,
	user: null,
	isEditing: false,
	isAuthLoading: false
}

export const authReducer = (state = initialState, action) => {
	switch (action.type){
		case LOGIN: 
			return {
				...state, 
				isAuth: true,
				user: action.payload,
				}
		case AUTHLOADING: 
			return {
				...state, 
				isAuthLoading: action.payload
			}
		case AUTH: 
			return {
				...state, 
				isAuth: true,
				user: action.payload
			}
		case LOGOUT:
			return {...state, isAuth: false, user: null}
		

		case UPDATE_USER:
			return {...state, user: action.payload}
		
		case UPDATE_USER_PICTURE:
			return {...state, user: {...state.user, profileImg: action.payload}}
		
		case EDITING:
			return {...state, isEditing: action.payload}
		default: return state
	}
}
