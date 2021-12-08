import React, { createRef, useState } from 'react'
import { InputGroup,FormControl,Button, Container} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'
import { useParams } from "react-router-dom"
import logo from './../assets/user-profile.png'
import { sendMessage,socket } from '../socket/Socket'
import { Message } from './Message'

export const Chat = () => {
    const isAuth = useAuth()
    const params = useParams()
    const messageBox = createRef(null)
    const [messages,updateMessages] = useState(() => {
        console.log("state init")
        return []
    })
    socket.on('receiveMessage', (message) => {
        updateMessages([...messages,{
            message: message,
            self:false
        }])
        document.getElementById('bottom').scrollIntoView({behavior: 'smooth', block: 'center'})
    })
    const message = (message) => {
        if(message){
            updateMessages([...messages,{
                message: message,
                self:true
            }])
            sendMessage(message)
            document.getElementById('bottom').scrollIntoView({behavior: 'smooth', block: 'center'})
            messageBox.current.value = ""
        }
    }
    return(
        <React.Fragment>
            {isAuth && (
                <React.Fragment>
                    <h1 className="chat-head sticky-top"><img src={logo} alt="img" className="logo"/> {params.name}</h1>
                    <InputGroup className="msg-input">
                        <FormControl
                            placeholder="message"
                            aria-label="message"
                            aria-describedby="basic-addon2"
                            ref={messageBox}
                        />
                        <Button variant="primary" id="button-addon2" className="msg-btn" onClick={() => message(messageBox.current.value)}>
                            Send
                        </Button>
                    </InputGroup>
                    <Container className="msg-container">
                        {messages.map((msg, index) => (
                            <Message key={index} message={msg.message} self={msg.self}/>
                        ))}
                        <p id="bottom"></p>
                    </Container>
                </React.Fragment>
            )}
            {!isAuth && (
                <Navigate to='/'/>
            )}
        </React.Fragment>
    )
}