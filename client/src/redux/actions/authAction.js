import { LOGIN, LOADING, LOGOUT, AUTH} from './types'

import {messageAction} from './messageAction'
import axios from 'axios'

export const loginAction = (data) => {
	return async (dispatch) => {
		try {
			await axios.post('https://react-mini-blog.herokuapp.com/api/auth/login', data)
				.then((res) => {
					const data = res.data
					localStorage.setItem('token', data.token)
					dispatch({
						type: LOGIN,
						payload: data.user
					})
				})
		} catch (e) {
			// dispatch(messageAction(true, e.response.data.message))

		}
	}
}

export const registerAction = (data) => {
	return async (dispatch) => {
		try {
			await axios.post('https://react-mini-blog.herokuapp.com/api/auth/register', data)
				.then(async(res) => {
					const data = res.data
					dispatch(messageAction(true, data.message))
				})
		} catch (e) {
			dispatch(messageAction(true, e.response.data.message))
		}
	}
}

export const authAction = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token') 
			if(token){
				await axios.get('https://react-mini-blog.herokuapp.com/api/auth/auth', {headers: {Authorization: `Bearer ${token}`}})
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
