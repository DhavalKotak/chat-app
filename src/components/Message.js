import React from 'react'
import { Alert, Row, Col } from 'react-bootstrap'

export const Message = (props) => {
        if(props.self){
            return(
                <Row>
                    <Col lg={{offset: 9}} md={{offset: 8}} xs={{offset: 4}} >
                        <Alert className="self-msg">{props.message}</Alert>
                    </Col>
                </Row>
            )
        }else{
            return(
                <Row>
                    <Col lg={{span: 3}} md={{span: 4}} xs={{span: 8}} >
                        <Alert className="sender-msg">{props.message}</Alert>
                    </Col>
                </Row>
            )
        }
}