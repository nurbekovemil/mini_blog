import React, {useEffect}from 'react'
import {Card,Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getPostList, deletePost, toggleEditPostForm, likePost } from '../../redux/actions/postAction'

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
          <Col key={index} className="p-2 d-flex align-items-stretch">
            
              <Card className="w-100">
                <Card.Body>
                  <Card.Title>{post.title.length > 32 ? `${post.title.slice(0,32)}... ` : post.title}</Card.Title>
                  <Card.Text>
                    {post.description.length > 80 ? `${post.description.slice(0,80)}... ` : post.description}
                    <Link to={`/post/${post._id}`}>подробнее</Link>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Tools 
                    dispatch={dispatch} 
                    deletePost={deletePost} 
                    isEditPostModal={isEditPostModal} 
                    toggleEditPostForm={toggleEditPostForm} 
                    post={post}
                    likePost={likePost} 
                    />
                </Card.Footer>
              </Card>
          
          </Col>
        )):
        'Добавьте запись'
      }
    </>
  )
}
