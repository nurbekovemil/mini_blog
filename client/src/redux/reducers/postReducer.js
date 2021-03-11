import {SETPOST, DETAILPOST, TOGGLEADDPOSTMODAL, TOGGLEEDITPOSTMODAL} from '../actions/types'
const initialState = {
  posts: [],
  isAddPostModal: false,
  isEditPostModal: false,
  postDetail: null,
  currentEditPost:null,
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
      // console.log('reducer post',action.payload.post)
      return {
        ...state,
        currentEditPost: action.payload.post,
        isEditPostModal: !action.payload.isEdit,
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