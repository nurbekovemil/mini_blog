import React from 'react'
import {Link} from 'react-router-dom'

import {Card} from 'react-bootstrap'
import {CalendarCheck} from 'react-bootstrap-icons'
import {Like} from './Like'
import {Tools} from './Tools'

export const CardPost = ({post, access_tools, distype, p}) => {
  return (
    <Card className="w-100 mb-3">
      <Card.Body >

        <Link to={`/post/${post._id}`}>
          <Card.Title>{post.title.length > 32 ? `${post.title.slice(0,32)}... ` : post.title}</Card.Title>
        </Link>
        <Card.Text>
          {post.description.length > 80 ? `${post.description.slice(0,80)}... ` : post.description}
        </Card.Text>

      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">

        <Like post={post} distype={distype} p={p} />
            
        {access_tools ? <Tools post={post} /> : <small className="float-right text-muted"><CalendarCheck className="mr-2"/>{new Date(post.date).toLocaleString()}</small> }

      </Card.Footer>
    </Card>
  )
}
