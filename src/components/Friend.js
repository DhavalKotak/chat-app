import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

export const Friend = (props) => {
    return(
        <div className="friend-list-item">
            <Row>
                <Col md="11">
                    <p>{props.name}</p>
                </Col>
                <Col md="auto">
                    <Button size="lg" variant="outline-primary">Chat</Button>
                </Col>
            </Row>
        </div>
    )
}