import {SETPOST, DETAILPOST, TOGGLEADDPOSTMODAL, TOGGLEEDITPOSTMODAL} from '../actions/types'
const initialState = {
  posts: [],
  isAddPostModal: false,
  isEditPostModal: false,
  postDetail: null,
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETPOST:
      return {
        ...state,
        posts: action.payload
      }
    case DETAILPOST:
      return {
        ...state,
        postDetail: action.payload
      }
    case TOGGLEEDITPOSTMODAL:
      return {
        ...state,
        isEditPostModal: !action.payload
      }
    case TOGGLEADDPOSTMODAL:
      return {
        ...state,
          isAddPostModal: action.payload
      }
    default: 
      return state
  }
}