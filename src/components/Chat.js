import React from 'react'
import { InputGroup,FormControl,Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'
import { useParams } from "react-router-dom"
import logo from './../assets/user-profile.png'

export const Chat = () => {
    const isAuth = useAuth()
    const params = useParams()
    return(
        <React.Fragment>
            {isAuth && (
                <React.Fragment>
                    <h1 className="chat-head"><img src={logo} alt="img" className="logo"/> {params.name}</h1>
                    <InputGroup className="msg-input">
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="primary" id="button-addon2" className="msg-btn">
                            Send
                        </Button>
                    </InputGroup>
                </React.Fragment>
            )}
            {!isAuth && (
                <Navigate to='/'/>
            )}
        </React.Fragment>
    )
}