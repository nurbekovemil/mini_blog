import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateUserData, isEditHandler} from '../../redux/actions/userAction'
import {toggleAddPostForm} from '../../redux/actions/postAction'

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
    <div>
      		<div className="card-body">
						{/* username */}
				  	{isEditing ? 
				  		<input  type="text" name="username" onChange={changeEditForm} className="form-control w-50" value={editForm.username}/> : 
				    	<h3 className="card-title mb-0" style={{height: 38+'px'}}>{user.username}</h3>
				    }
				    <p className="card-text"><small className="text-muted">Имя пользователя</small></p>
						{/* email */}
				    {isEditing ?
				  		<input  type="email" name="email" onChange={changeEditForm}  className="form-control w-50" value={editForm.email}/> : 
				   		<h3 className="card-title mb-0" style={{height: 38+'px'}}>{user.email}</h3>
				    }
				    <p className="card-text"><small className="text-muted">Электронный адрес</small></p>
						{/* about */}
				    {isEditing ?
				    	<textarea className="form-control w-50" style={{height: 38+'px'}} name="about" onChange={changeEditForm} value={editForm.about}/> : 
				   		<h6 className="card-title text-muted mb-0 d-flex align-items-center" style={{height: 38+'px'}}>{user.about}</h6>
				    }
				    <p className="card-text"><small className="text-muted">О себе</small></p>

				    {isEditing ? 
				    	<div>
					    	<button  className="btn btn-secondary mr-3"  onClick={cancelEditForm}>Отмена</button>
					    	<button  className="btn btn-primary" onClick={sendEditForm}>
					    		Сохранить
					    	</button> 
				    	</div> :
				    	<div>
					    	<button  className="btn btn-primary  mr-3" onClick={openAddPostForm}>Добавить пост</button>
					    	<button  className="btn btn-light" onClick={editHandler}>Редактировать профиль</button>
				    	</div>
				    }
				  </div>
    </div>
  )
}
