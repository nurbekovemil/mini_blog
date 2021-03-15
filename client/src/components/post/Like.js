import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";

import {ButtonGroup, Button} from 'react-bootstrap'
import {HandThumbsUp} from 'react-bootstrap-icons'

import { likePost } from '../../redux/actions/postAction'


export const Like = ({post, distype, p}) => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.authReducer.isAuth)
  let history = useHistory()
  const handlerLike = () => {
    isAuth ? dispatch(likePost({post_id: post._id}, distype, p)) : history.push('/auth')
  }
  return (
    <ButtonGroup>
      <Button variant="light" size="sm" onClick={handlerLike}><HandThumbsUp/></Button>
      <Button variant="light" size="sm">{post.likes_count}</Button>
    </ButtonGroup>
  )
}
