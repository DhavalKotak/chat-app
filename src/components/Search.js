import React, { useState } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Row, Col, InputGroup, FormControl, Button, Container } from 'react-bootstrap'

export const Search = () => {
    const isAuth = useAuth()
    const searchField = React.createRef(null)
    const token = localStorage.getItem("token")
    const [userFound, updateUserFound] = useState(false)
    const [alreadyFriend, updateAlreadyFriend] = useState(false)

    const searchUser = (user) => {
        if(user !== ""){
            fetch("http://localhost:4000/search",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({user})
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if(data.message === "No result found"){
                    alert(data.message)
                    updateUserFound(false)
                }
                else if(data.message){
                    updateUserFound(user)
                    updateAlreadyFriend(true)
                }
                else{
                    updateUserFound(user)
                    updateAlreadyFriend(false)
                }
            })
        }
    }

    const sendFriendRequest = (user) => {
        fetch("http://localhost:4000/friend/sendRequest",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({user})
        })
        .then(res => {
            if(res.ok)
                updateAlreadyFriend(true)
        })
    }

    return (
        <Container>
            {isAuth && (
                <InputGroup className="mb-3 mt-3">
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon2"
                        ref={searchField}
                    />
                    <Button variant="outline-info" id="button-addon2" onClick={() => searchUser(searchField.current.value)}>
                        Search
                    </Button>
                </InputGroup>
            )}
            {!isAuth && (
                <Navigate to='/'/>
            )}
            {userFound && (
                <div className="friend-list-item">
                    <Row>
                        <Col md="11">
                            <p>{userFound}</p>
                        </Col>
                        <Col md="auto">
                            <Button variant="outline-success" disabled={alreadyFriend} onClick={() => sendFriendRequest(userFound)}>Send Request</Button>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    )
}