import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useAuth } from '../context/AuthContext'
import { Friend } from './Friend'

export const User = () => {

    const isAuth = useAuth()
    const [friends, setFriendList] = useState([])

    const getFriendList = async () => {
        const token = localStorage.getItem("token")
        
        fetch("http://localhost:4000/friend/list",{
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
            setFriendList(data.message)
        })
    }

    useEffect(() => {
        if(isAuth)
            getFriendList()  
    },[isAuth])
    
    return (
        isAuth ? 
        <Container fluid>
            {friends.map((friend, index) => (
                <Friend key={index} name={friend.USER}/>
            ))}
        </Container>
        : <h1>401: Authentication required</h1>
    )
}
