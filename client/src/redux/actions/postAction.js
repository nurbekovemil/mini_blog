import {SETPOST, DETAILPOST, TOGGLEADDPOSTMODAL, TOGGLEEDITPOSTMODAL} from './types'
import {messageAction} from './messageAction'
import {getAllPosts} from './homeAction'

import axios from 'axios'

export const getPostList = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      await axios.get('/api/post/',{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        console.log(res.data)
        dispatch({type: SETPOST, payload: res.data.posts})
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const getPostById = (postId) => {
  return async (dispatch) => {
    try {
      await axios.get(`/api/post/${postId}`)
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
      await axios.post('/api/post/create', data, {
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
      await axios.delete(`/api/post/${postId}`, {
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

export const updatePost = (data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put('/api/post/update', data, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        dispatch(getPostList())
        dispatch(toggleEditPostForm(true))
        dispatch(messageAction(res.data.message))
      })
    } catch (err) {
      dispatch(messageAction(err.response.data.message))
    }
  }
}
export const likePost = (data, distype, p) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(`/api/post/like`,data,{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        distype === 'OWNER_POST' && dispatch(getPostList())
        distype === 'DETAIL_POST' && dispatch(getPostById(res.data._id))
        distype === 'ALL_POST' && dispatch(getAllPosts(p))
      })
    } catch (err) {
      console.log(err.response.data)
    }
  }
}
export const toggleEditPostForm = (isEdit, post) => async (dispatch) => dispatch({type: TOGGLEEDITPOSTMODAL, payload: {isEdit:isEdit, post:post}})

export const toggleAddPostForm = (data) => (dispatch) => dispatch({type: TOGGLEADDPOSTMODAL, payload: data})
