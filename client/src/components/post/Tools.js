import React from 'react'
import { PencilSquare, Trash, Clipboard, HandThumbsUp} from 'react-bootstrap-icons';
import {Row, Col, ButtonGroup, Button} from 'react-bootstrap'


export const Tools = ({dispatch, isEditPostModal, deletePost,likePost, toggleEditPostForm, post}) => {
  
  const handlerRemovePost = () => {
    dispatch(deletePost(post._id))
  }
  const openEditPostForm = () => {
    dispatch(toggleEditPostForm(isEditPostModal, post))
    // console.log('open edot form ',post)
  }
  const handleLikePost = () => {
    
  }
  const copyText = `${window.location.host}/post/${post._id}`
  return (
    <Row>
      <Col className="mr-auto">
        <Button variant="light" size="sm" onClick={handleLikePost}><HandThumbsUp/></Button>    
      </Col>
      <Col className="text-right">
        <ButtonGroup aria-label="Basic example">
            <Button variant="light" size="sm" onClick={openEditPostForm} ><PencilSquare/></Button>
            <Button variant="light" size="sm" onClick={() => {navigator.clipboard.writeText(copyText)}}><Clipboard/></Button>
            <Button variant="light" size="sm" onClick={handlerRemovePost}><Trash/></Button>
          </ButtonGroup>
      </Col>
    </Row>
  )
}
