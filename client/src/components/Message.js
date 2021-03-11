import React from 'react'
import {Card, Row, Col} from 'react-bootstrap'
export const Message = ({message}) => {
  if(message){
    return (
      <Row className="fixed-bottom m-2">
        <Col md={4} sm={12}>
          <Card bg="dark" text="white">
            <Card.Body>
              { message }
            </Card.Body>
          </Card>
        </Col>
      </Row>
      )
  }
}