import {MESSAGE} from './types'

export const messageAction = (message) => {
	return (dispatch) => {
		dispatch({
			type: MESSAGE,
			payload: {
				alert: true, 
				message: message,
			}
		})
		setTimeout(() => {
			dispatch({
				type: MESSAGE, 
				payload: {
					alert: false,
					message: null
				}
			})
		}, 5000)
	}
}