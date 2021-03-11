import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Modal, Button, Form} from 'react-bootstrap'
import {toggleEditPostForm, updatePost} from '../../redux/actions/postAction'


export const EditPost = () => {
  const dispatch = useDispatch()
  const { isEditPostModal, currentEditPost} = useSelector(state => state.postReducer)
  const ref = React.createRef()
  const [post, setPost] = useState({})
  
  const changeHandler = (event) => {
    setPost({...post, [event.target.name]: event.target.value})
  }
  const sendEditPost = () => {
    post && dispatch(updatePost(post))
  }
  useEffect(() => {
    setPost(currentEditPost)
  }, [currentEditPost])

  const closeEditPostForm = () => dispatch(toggleEditPostForm(isEditPostModal, post))
    return (
      <Modal
          ref={ref}
          show={isEditPostModal}
          onHide={closeEditPostForm}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Редактировать</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle1">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control type="text" name="title" onChange={changeHandler} value={post ? post.title:'loading...'}/>
            </Form.Group>
  
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Описание</Form.Label>
              <Form.Control as="textarea" name="description" onChange={changeHandler} rows="3" value={post ? post.description:'loading...'} />
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditPostForm}>
              Отмена
            </Button>
            <Button variant="primary" onClick={sendEditPost}>
              Изменить
            </Button>
          </Modal.Footer>
        </Modal>
    )
    
}
