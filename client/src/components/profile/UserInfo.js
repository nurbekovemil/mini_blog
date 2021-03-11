import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateUserData, isEditHandler} from '../../redux/actions/userAction'
import {toggleAddPostForm} from '../../redux/actions/postAction'
import {Button,Row, Col, FormControl} from 'react-bootstrap'

export const UserInfo = ({user, isEditing, isAddPostModal}) => {

  const dispatch = useDispatch()
	
	// new user data
	const defaultEditForm = {
		username: user.username, 
		email: user.email,
		about: user.about,
	}
	const [editForm, setEditForm] = useState(defaultEditForm)
	// open/close edit form
	const editHandler = () => {
		dispatch(isEditHandler(!isEditing))
	}
	// changing edit form data
	const changeEditForm = (event) => {
		setEditForm({...editForm, [event.target.name]:event.target.value})
	}
	// cancel edit form
	const cancelEditForm = () => {
		editHandler()
		setEditForm(defaultEditForm)
	}
	// update user
	const sendEditForm = () => {
		dispatch(updateUserData(editForm))
	}

	const openAddPostForm = () => {
		dispatch(toggleAddPostForm(!isAddPostModal))
	}
  return (
		<Row style={{height: 250+'px'}} className="d-flex align-items-center">
			{isEditing ? (
				<>
				<Col md="12">
					<FormControl type="text" name="username" onChange={changeEditForm} value={editForm.username}/>
					<small className="text-muted">Имя</small>
				</Col>
				<Col md="12">
					<FormControl type="email" name="email" onChange={changeEditForm} value={editForm.email}/>
					<small className="text-muted">Email адрес</small>
				</Col>
				<Col md="12">
					<FormControl type="text" name="about" onChange={changeEditForm} value={editForm.about}/>
					<small className="text-muted">О себе</small>
				</Col>
				<Col md="12" className="d-flex align-self-end">
					<Button variant="dark"  onClick={sendEditForm}>Изменить</Button>
					<Button variant="light" className="ml-3" onClick={cancelEditForm}>Отмена</Button>
				</Col>
				</>
			):(
				<>
					<Col md="12">
					<h5>{user.username}</h5>
					<small className="text-muted">Имя</small>
					</Col>
					<Col md="12">
					<h5>{user.email}</h5>
					<small className="text-muted">Email адрес</small>
					</Col>
					<Col md="12">
					<h5>{user.about}</h5>
					<small className="text-muted">О себе</small>
					</Col>
					<Col md="12" className="d-flex align-self-end">
						<Button variant="dark"  onClick={openAddPostForm}>Добавить запись</Button>
					  <Button variant="light" className="ml-3" onClick={editHandler}>Редактировать</Button>
					</Col>
				</>
			)}
		</Row>
	
  )
}
