import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {createPost, toggleAddPostForm} from '../../redux/actions/postAction'

export const AddPost = ({isAddPostModal}) => {
  const dispatch = useDispatch()
  const ref = React.createRef()
  const [post, setPost] = useState({
    title: '', description: ''
  })

  const changeHandler = (event) => {
    setPost({...post, [event.target.name]: event.target.value})
  }

  const sendPost = () => {
    dispatch(createPost(post))
  }

  const closeAddPostForm = () => dispatch(toggleAddPostForm(!isAddPostModal))
  return (
      <Modal
        ref={ref}
        show={isAddPostModal}
        onHide={closeAddPostForm}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить пост</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicTitle1">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control type="text" name="title" onChange={changeHandler} placeholder="Заголовок поста" />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" name="description" onChange={changeHandler} rows="3" />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddPostForm}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={sendPost}>Добавить</Button>
        </Modal.Footer>
      </Modal>
  )
}
