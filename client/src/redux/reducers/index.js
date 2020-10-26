import { combineReducers } from 'redux'

import {authReducer} from './authReducer'
import {appReducer} from './appReducer'
import {postReducer} from './postReducer'

const rootReducer = combineReducers({
	authReducer,
	appReducer,
	postReducer
})

export default rootReducer