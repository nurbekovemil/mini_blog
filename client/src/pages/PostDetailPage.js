import React, {useEffect}from 'react'
import {useParams} from 'react-router-dom'

import {Card, Image,Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getPostById} from '../redux/actions/postAction'
import {Share, CalendarCheck} from 'react-bootstrap-icons';

import {Like} from '../components/post/Like'

export const PostDetailPage = () => {
  const postId = useParams().id
  const post = useSelector(state => state.postReducer.postDetail)
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(getPostById(postId))
  }, [dispatch, postId])

  return (
    <>
      {post && 
      <Card className="mt-3">
        <Card.Header>
          <Row>
            <Col>
              <Image src={post.author.profileImg} style={{width: 30+'px', height:30+'px', marginRight:10+'px'}} roundedCircle />{post.author.username}
            </Col>
            <Col className="text-right">
              <Button variant="light"><Share/></Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>
            {post.description}
          </Card.Text>
          <Card.Text>
            <Like post={post} distype="DETAIL_POST"/>
            <small className="float-right text-muted"><CalendarCheck className="mr-2"/>{new Date(post.date).toLocaleString()}</small>
          </Card.Text>
        </Card.Body>
      </Card>}
    </>
    
  )
}
