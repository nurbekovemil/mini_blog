import { SET_ALL_POSTS, SET_CURRENT_PAGE} from '../actions/types'

const initialState = {
	posts: [],
  limit:5,
  page:1,
  post_count: null
}

export const homeReducer = (state = initialState, action) => {
	switch (action.type){
		case SET_ALL_POSTS: 
			return {
				...state, 
				posts: action.payload.all_posts,
        post_count: action.payload.post_count

				}
    case SET_CURRENT_PAGE: 
      return {
        ...state, 
        page: action.payload 
      }
    default: return state
  }
}