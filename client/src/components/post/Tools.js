import React from 'react'
import { PencilSquare, Trash, Share} from 'react-bootstrap-icons';
import {ButtonGroup, Button} from 'react-bootstrap'


export const Tools = ({dispatch, isEditPostModal, deletePost, toggleEditPostForm, post}) => {
  
  const handlerRemovePost = () => {
    dispatch(deletePost(post._id))
  }
  const openEditPostForm = () => {
    dispatch(toggleEditPostForm(isEditPostModal, post._id))
    // console.log(post._id)
  }
  return (
      <ButtonGroup aria-label="Basic example">
        <Button variant="light" size="sm" onClick={openEditPostForm} ><PencilSquare/></Button>
        <Button variant="light" size="sm"><Share/></Button>
        <Button variant="light" size="sm" onClick={handlerRemovePost}><Trash/></Button>
      </ButtonGroup>
  )
}
