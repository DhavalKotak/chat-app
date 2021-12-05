import React from 'react'
import {Container,Form,Button} from 'react-bootstrap'
import { Navigate } from 'react-router'
import { useAuth, useUpdateAuth } from '../../context/AuthContext'

export const Login = () => {

    const isAuth = useAuth()
    const setAuth = useUpdateAuth()

    const userField = React.createRef(null)
    const passField = React.createRef(null)

    const login = () => {
        
        let username = userField.current.value
        let password = passField.current.value
        fetch("http://localhost:4000/auth/login",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            if(data.message !== "Incorrect username or password!"){
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
                login()
            event.preventDefault()
    }

    return(
        !isAuth ?
        <Container>
            <div className="login-container">
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            required 
                            ref={passField}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
        : <Navigate to={`/user/${localStorage.getItem("username")}`}/>
    )

}