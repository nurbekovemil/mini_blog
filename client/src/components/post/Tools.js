import React from 'react'
import { useSelector, useDispatch} from 'react-redux'

import { ButtonGroup, Button } from 'react-bootstrap'
import { PencilSquare, Trash, Clipboard} from 'react-bootstrap-icons'

import { deletePost, toggleEditPostForm} from '../../redux/actions/postAction'

export const Tools = ({post}) => {
  const dispatch = useDispatch()
  const {isEditPostModal} = useSelector(state => state.postReducer)
  
  const handlerRemovePost = () => {
    dispatch(deletePost(post._id))
  }
  const openEditPostForm = () => {
    dispatch(toggleEditPostForm(isEditPostModal, post))
  }

  const copyText = `${window.location.host}/post/${post._id}`
  return (
        <ButtonGroup>
            <Button variant="light" size="sm" onClick={openEditPostForm} ><PencilSquare/></Button>
            <Button variant="light" size="sm" onClick={() => {navigator.clipboard.writeText(copyText)}}><Clipboard/></Button>
            <Button variant="light" size="sm" onClick={handlerRemovePost}><Trash/></Button>
        </ButtonGroup>
  )
}
