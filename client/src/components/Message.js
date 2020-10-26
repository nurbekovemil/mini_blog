import React from 'react'
import {Card} from 'react-bootstrap'
export const Message = ({message}) => {

	return (
    <Card bg="dark" text="white" style={{ position: 'fixed', bottom:1+'rem', left: 1+'rem',minWidth: '20rem', width: '25rem' }}>
      <Card.Body>
        {message }
      </Card.Body>

    </Card>
    )
}