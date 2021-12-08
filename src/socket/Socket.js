import {io} from 'socket.io-client'
export const socket = io("http://localhost:4000")

export const joinChat = (name) => {
    const token = localStorage.getItem("token")
    socket.emit('joinChat', token, name)
}

socket.on('getChatID', id => {
    localStorage.setItem("chat_id",id)
})

export const sendMessage = (message) => {
    let chat_id = localStorage.getItem("chat_id")
    socket.emit('sendMessage',message,chat_id)
}