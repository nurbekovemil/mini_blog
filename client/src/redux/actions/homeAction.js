import { LOADING, SET_ALL_POSTS, SET_CURRENT_PAGE} from './types'
import axios from 'axios'

export const getAllPosts = (data) => async (dispatch) =>{
  try {
    dispatch({type: SET_CURRENT_PAGE, payload: data.current_page})
    await axios.get(`/api/post/posts?page=${data.page}&limit=${data.limit}`)
      .then((res) => {
        dispatch({type: SET_ALL_POSTS, payload: res.data})
      })
  } catch(e){
    console.log(e.message)
  }
}