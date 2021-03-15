import React, {useEffect}from 'react'
import {Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getPostList} from '../../redux/actions/postAction'

import {CardPost} from './CardPost'

export const ListPost = () => {
  const dispatch = useDispatch()
  const {posts} = useSelector(state => state.postReducer)
  useEffect( () => {
    dispatch(getPostList())
  }, [dispatch])

  return (
    <>
      {
        posts.length ? posts.map((post, index) => (
          <Col key={index} className="p-2 d-flex align-items-stretch">
            <CardPost post={post} access_tools={true} distype="OWNER_POST"/>
          </Col>
        )):
        'Добавьте запись'
      }
    </>
  )
}
