import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Modal, Button, Form} from 'react-bootstrap'
import {toggleEditPostForm} from '../../redux/actions/postAction'


export const EditPost = ({isEditPostModal}) => {
  const dispatch = useDispatch()
  const {postDetail} = useSelector(state => state.postReducer)
  const ref = React.createRef()

  const [post, setPost] = useState(postDetail)

  const changeHandler = (event) => {
    setPost({...post, [event.target.name]: event.target.value})
    console.log(post)
  }


  const closeEditPostForm = () => dispatch(toggleEditPostForm(isEditPostModal))
  return (
    <Modal
        ref={ref}
        show={isEditPostModal}
        
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
            <Form.Control type="text" name="title" onChange={changeHandler} value={post ? post.title : 'loading...'}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" name="description" onChange={changeHandler} rows="3" value={post ? post.title : 'loading...'} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditPostForm}>
            Закрыть
          </Button>
          {/* <Button variant="primary" onClick={sendPost}>Добавить</Button> */}
        </Modal.Footer>
      </Modal>
  )
}
