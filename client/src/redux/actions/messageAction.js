import {MESSAGE} from './types'

export const messageAction = (message) => {
	return (dispatch) => {
		dispatch({
			type: MESSAGE,
			payload: {
				message: message,
				alert: true, 
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
		}, 4000)
	}
}