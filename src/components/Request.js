import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'
import {Container,Col,Row,Button} from 'react-bootstrap'

export const Request = () => {

    const isAuth = useAuth()
    const [requests, updateRequest] = useState([])
    const token = localStorage.getItem("token")

    const getRequest = async () => {
        fetch("http://localhost:4000/friend/request",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            updateRequest(data.message)
        })
    }

    const acceptRequest = async (sender) => {
        fetch("http://localhost:4000/friend/acceptRequest",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({sender})
        })
        .then((response) => {
            if(response.ok){
                updateRequest(() => {
                    let updatedRequests =  requests.filter(request => request.USER !== sender)
                    return updatedRequests
                })
            }
        })
    }

    const declineRequest = async (sender) => {
        fetch("http://localhost:4000/friend/declineRequest",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({sender})
        })
        .then((response) => {
            if(response.ok){
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
                                    <Button size="lg" variant="outline-success" onClick={() => acceptRequest(request.USER)}>Accept</Button>{' '}
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