import React from 'react'
import {Col,Row,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export const Friend = (props) => {
    return(
        <div className="friend-list-item">
            <Row>
                <Col md="11">
                    <p>{props.name}</p>
                </Col>
                <Col md="auto">
                    <Link to={`/chat/${props.name}`}><Button size="lg" variant="outline-primary">Chat</Button></Link>
                </Col>
            </Row>
        </div>
    )
}