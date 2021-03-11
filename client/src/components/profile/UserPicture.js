import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateUserPicture} from '../../redux/actions/userAction'
import {Card, Button, Form, Row, Col} from 'react-bootstrap'


export const UserPicture = ({user, isEditing}) => {
  const dispatch = useDispatch() 
	const [profileImg, setProfileImg] = useState(null)

	const changeFileForm = (event) => {
    setProfileImg(event.target.files[0])
	}

  const sendProfileImg = () => {
    const fd = new FormData()
		fd.append('profileImg', profileImg)
    dispatch(updateUserPicture(fd))
  }
  
  return (
    <Row className="25">
      <Col>
        <Card border="white">
        <Card.Body className="d-flex justify-content-center">
          <Card.Img style={{width: 126+'px', height: 126+'px'}} src={user.profileImg}/>




          
        </Card.Body>
        {isEditing && <Form.File id="formcheck-api-regular">
        <Form>
          <Form.File 
            id="custom-file-translate-scss"
            label="Select"
            custom
            onChange={changeFileForm}
          />
        </Form>
          <Button className="mt-2" 
            size="mb" 
            block 
            disabled={!profileImg}
            variant={profileImg ? "success" : "secondary"} 
            onClick={sendProfileImg}>
            Изменить
            </Button>
        </Form.File>}
      </Card>
      </Col>
    </Row>

  )
}
