import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavigationBar } from './components/NavigationBar'
import { Home } from './components/Home'
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import { User } from './components/User'
import { Request } from './components/Request'
import { Search } from './components/Search'
import { Chat } from './components/Chat'
import NotFound404 from './components/NotFound404'

import { AuthProvider } from './context/AuthContext'

class App extends React.Component{
  render(){
    return(
      <AuthProvider>
        <Router>
          <NavigationBar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/user/:user" element={<User/>}/>
            <Route exact path="/request" element={<Request/>}/>
            <Route exact path="/search" element={<Search/>}/>
            <Route exact path="/chat/:name" element={<Chat/>}/>
            <Route path="*" element={<NotFound404/>}/>
          </Routes>
        </Router>
      </AuthProvider>
      
    )
  }
}
export default App
