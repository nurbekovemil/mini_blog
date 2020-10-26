import {PROGRESS, UPDATE_USER_PICTURE, UPDATE_USER, EDITING} from './types'
import {messageAction} from './messageAction'
import axios from 'axios'



export const isEditHandler = (data) => {
	return (dispatch) => {
		dispatch({type: EDITING, payload: data})
	}
}

export const updateUserPicture = (data) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token')
			await axios.post('https://react-mini-blog.herokuapp.com/api/user/update-profile', data, {
				headers: {Authorization: `Bearer ${token}`,'Content-Type':'multipart/form-data'}
			})
			.then(res => {
				const resdata = res.data
				dispatch({type: UPDATE_USER_PICTURE, payload: resdata.picture})
				dispatch(messageAction(resdata.message))
			})
		} catch (e) {
			dispatch(messageAction(e.response.data.message))
		}
	}
}

export const updateUserData = (data) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token')
			await axios.post('https://react-mini-blog.herokuapp.com/api/user/update', data, 
			{
				headers: {Authorization: `Bearer ${token}`}
			})
			.then(async(res) => {
				const resdata = await res.data
				dispatch({type: UPDATE_USER, payload: resdata.user})
				dispatch(isEditHandler(false))
				dispatch(messageAction(resdata.message))
				
			})
		} catch (e) {
			dispatch({type: PROGRESS, payload: false})
			console.log(e.response)
		}
	}
}