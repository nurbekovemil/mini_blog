import React, {useEffect}from 'react'
import {CardDeck, Card,Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getPostList, deletePost, toggleEditPostForm} from '../../redux/actions/postAction'

import {Link} from 'react-router-dom'
import {Tools} from '../../components/post/Tools'

export const ListPost = () => {
  const dispatch = useDispatch()
  const {posts, isEditPostModal} = useSelector(state => state.postReducer)
  useEffect( () => {
    dispatch(getPostList())
  }, [dispatch])

  return (
    <>
      {
        posts.length ? posts.map((post, index) => (
          <Col key={index} className="p-2">
            <CardDeck>
              <Card>
                <Card.Body>
                  <Card.Title>{post.title.length > 32 ? `${post.title.slice(0,32)}...` : post.title}</Card.Title>
                  <Card.Text>
                    {post.description.length > 80 ? `${post.description.slice(0,80)}...` : post.description}
                    <Link to={`/post/${post._id}`}>подробнее</Link>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col className="mr-auto">
                      
                    </Col>
                    <Col className="text-right">
                      <Tools dispatch={dispatch} post={post} deletePost={deletePost} isEditPostModal={isEditPostModal} toggleEditPostForm={toggleEditPostForm} post={post} />
                    </Col>

                  </Row>
                </Card.Footer>
              </Card>
          </CardDeck>
          </Col>
        )):
        'not posts '
      }
    </>
  )
}
