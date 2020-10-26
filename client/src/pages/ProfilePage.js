import React from 'react'
import {useSelector} from 'react-redux'


import {Row, Col} from 'react-bootstrap'
import {UserInfo} from '../components/profile/UserInfo'
import {UserPicture} from '../components/profile/UserPicture'
import {AddPost} from '../components/post/AddPost'
import {ListPost} from '../components/post/ListPost'
import {EditPost} from '../components/post/EditPost'


export const ProfilePage = () => {
	const {user, isEditing} = useSelector(state => state.authReducer)
	const {isAddPostModal, isEditPostModal} = useSelector(state => state.postReducer)

	return (
		<>
			<Row>
				<Col xs="3">
					<UserPicture user={user} isEditing={isEditing}/>
				</Col>
				<Col>
					<UserInfo user={user} isEditing={isEditing} isAddPostModal={isAddPostModal}/>
					<AddPost isAddPostModal={isAddPostModal}/>
					<EditPost isEditPostModal={isEditPostModal}/>
				</Col>
			</Row>
			<Row md={3}>
				<ListPost/>
			</Row>
		</>
		)
}
