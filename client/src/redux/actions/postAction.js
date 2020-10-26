import {SETPOST, DETAILPOST, TOGGLEADDPOSTMODAL, TOGGLEEDITPOSTMODAL} from './types'
import {messageAction} from './messageAction'

import axios from 'axios'

export const getPostList = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      await axios.get('https://react-mini-blog.herokuapp.com/api/post/',{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        const resdata = res.data
        dispatch({type: SETPOST, payload: resdata.posts})
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const getPostById = (postId) => {
  return async (dispatch) => {
    try {
      await axios.get(`https://react-mini-blog.herokuapp.com/api/post/${postId}`)
      .then(res => {
        const resdata = res.data
        dispatch({type: DETAILPOST, payload: resdata})
      })
    } catch (err) {

    }
  }
}

export const createPost = (data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post('https://react-mini-blog.herokuapp.com/api/post/create', data, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        dispatch(getPostList())
        dispatch(toggleAddPostForm(false))
        dispatch(messageAction(res.data.message))
      })
    } catch (err) {
      dispatch(messageAction(err.response.data.message))
    }
  }
}
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`https://react-mini-blog.herokuapp.com/api/post/${postId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        dispatch(getPostList())
        dispatch(messageAction(res.data.message))
      })
    } catch (err) {
      dispatch(messageAction(err.response.data.message))
    }
  }
}

export const toggleEditPostForm = (isEdit, postId) => {
  return async (dispatch) => {
    // console.log(postId)
    dispatch({type: TOGGLEEDITPOSTMODAL, payload: isEdit})
  }
}

export const toggleAddPostForm = (data) => {
  return (dispatch) => {
    dispatch({type: TOGGLEADDPOSTMODAL, payload: data})
  }
}