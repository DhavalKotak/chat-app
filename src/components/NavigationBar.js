import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import logo from './../assets/logo.png'
import { useAuth, useUpdateAuth } from '../context/AuthContext'
import { BsSearch, BsBellFill } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'

export const NavigationBar = () => {

    const isAuth = useAuth()
    const setAuth = useUpdateAuth()
    let username = localStorage.getItem("username") 

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setAuth(false)
        window.location.replace('/')
    }
    
    return(
        <Navbar expand="lg">
            <Navbar.Brand href={!isAuth? '/':`/user/${username}`}>
                <img src={logo} alt="logo" className="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {!isAuth && (
                        <React.Fragment>
                            <Nav.Item>
                                <Nav.Link href="/">
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/login">
                                    Login
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/register">
                                    Register
                                </Nav.Link>
                            </Nav.Item>
                        </React.Fragment>
                    )}
                    {isAuth && (
                        <React.Fragment>
                            <Nav.Item>
                                <Nav.Link href={`/user/${username}`}>
                                    {username}
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/search">
                                    <BsSearch/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Link href="/request">
                                <BsBellFill/>
                            </Nav.Link>
                            <Nav.Link>
                                <AiOutlineLogout onClick={logout}/>
                            </Nav.Link>
                        </React.Fragment>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}