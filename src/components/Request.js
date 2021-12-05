import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Container from 'react-bootstrap/Container'
import { Navigate } from 'react-router'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

export const Request = () => {

    const isAuth = useAuth()
    const [requests, updateRequest] = useState([])
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")

    const getRequest = async () => {
        

        fetch("http://localhost:4000/friend/request",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({username})
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            updateRequest(data.message)
        })
    }
    // eslint-disable-next-line
    const acceptRequest = async () => {
        //Send username of the sender and receiver and delete that record and insert it into friendlist table
    }
    // eslint-disable-next-line
    const declineRequest = async (sender) => {
        fetch("http://localhost:4000/friend/declineRequest",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({username, sender})
        })
        .then((res) => {
            if(res.ok){
                updateRequest(() => {
                    let updatedRequests =  requests.filter(request => request.USER !== sender)
                    return updatedRequests
                })
            }
        })

    }

    useEffect(() => {
        if(isAuth)
            getRequest()
    },[isAuth])

    return(
        <Container fluid>
            {isAuth && (
                <React.Fragment>
                    {requests.map((request, index) => (
                        <div className="request-list-item" key={index}>
                            <Row>
                                <Col md="10">
                                    <p>{request.USER}</p>
                                </Col>
                                <Col md="auto">
                                    <Button size="lg" variant="outline-success">Accept</Button>{' '}
                                    <Button size="lg" variant="outline-danger" onClick={() => declineRequest(request.USER)}>Decline</Button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </React.Fragment>
            )}
            {!isAuth && (
                <Navigate to='/login'/>
            )}
        </Container>
    )
}