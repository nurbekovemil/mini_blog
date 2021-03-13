import { combineReducers } from 'redux'

import {authReducer} from './authReducer'
import {appReducer} from './appReducer'
import {postReducer} from './postReducer'
import {homeReducer} from './homeReducer'

const rootReducer = combineReducers({
	authReducer,
	appReducer,
	postReducer,
	homeReducer
})

export default rootReducer