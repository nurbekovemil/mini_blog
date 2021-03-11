import { LOGIN, LOADING, LOGOUT, AUTH, AUTHLOADING} from './types'

import {messageAction} from './messageAction'
import axios from 'axios'

export const loginAction = (data) => {
	return async (dispatch) => {
		try {
			dispatch({type: AUTHLOADING, payload: true})
			await axios.post('/api/auth/login', data)
				.then((res) => {
					const data = res.data
					localStorage.setItem('token', data.token)
					dispatch({type: LOGIN,payload: data.user})
					dispatch({type: AUTHLOADING,payload: false})
				})
		} catch (e) {
			
			dispatch(messageAction(e.response.data.message))
			dispatch({type: AUTHLOADING,payload: false})
		}
	}
}

export const registerAction = (data) => {
	return async (dispatch) => {
		try {
			dispatch({type: AUTHLOADING,payload: true})
			await axios.post('/api/auth/register', data)
				.then(async(res) => {
					const data = res.data
					localStorage.setItem('token', data.token)
					dispatch({type: LOGIN,payload: data.user})
					dispatch(messageAction(data.message))
					dispatch({type: AUTHLOADING,payload: false})
				})
		} catch (e) {
			dispatch(messageAction(e.response.data.message))
			dispatch({type: AUTHLOADING,payload: false})
		}
	}
}

export const authAction = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token') 
			if(token){
				await axios.get('/api/auth/auth', {headers: {Authorization: `Bearer ${token}`}})
				.then(async(res) => {
					const data = await res.data
					localStorage.setItem('token', data.token)
					dispatch({type: AUTH, payload: data.user})
					// dispatch({type: LOADING, payload: true})

				})
			}
			dispatch({type: LOADING, payload: true})
		} catch (e) {
			localStorage.removeItem('token')
			dispatch({type: LOADING, payload: true})
		}
	}
}

export const logoutAction = () => (dispatch) => {
	localStorage.removeItem('token')
	dispatch({type: LOGOUT})
}
