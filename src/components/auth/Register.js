import React from 'react'
import { Navigate } from 'react-router'
import {Container,Form,Button} from 'react-bootstrap'
import { useAuth, useUpdateAuth } from '../../context/AuthContext'

export const Register = () => {
    const isAuth = useAuth()
    const setAuth = useUpdateAuth()

    const userField = React.createRef(null)
    const mailField = React.createRef(null)
    const passField = React.createRef(null)

    const register = () => {
        let username = userField.current.value
        let email = mailField.current.value
        let password = passField.current.value
        fetch("http://localhost:4000/auth/register",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, email})
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            if(data.message !== "Username already exist!"){
                localStorage.setItem("token", data.message)
                localStorage.setItem("username",username)
                setAuth(true)
            }else{
                alert(data.message)
            }
        })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
            if (form.checkValidity() === false) 
                event.stopPropagation()
            else
                register()
            event.preventDefault()
    }

    return(
        !isAuth ?
        <Container>
            <div className="register-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            required 
                            ref={userField}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicMail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            required 
                            ref={mailField}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            required 
                            minLength="8" 
                            ref={passField}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </Container>
        : <Navigate to={`/user/${localStorage.getItem("username")}`}/>
    )
}