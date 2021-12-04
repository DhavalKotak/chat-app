import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from './../assets/banner.png'

export const Home = () => {
    const isAuth = useAuth()

    return(
        <Container>
            {!isAuth && (
                <React.Fragment>
                    <Container>
                        <Row className="text-center">
                            <Col>
                                <div className="home-container">
                                    <h1>Chat Application</h1><br/>
                                    <img src={logo} alt="logo" className="home-img"/><br/>
                                    <Link to="/login"><Button variant="primary" size="lg" className="home-auth-btn">Login</Button></Link> 
                                    <Link to="/register"><Button variant="primary" size="lg" className="home-auth-btn">Register</Button></Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            )}
            {isAuth && (
                <Navigate to={`/user/${localStorage.getItem("username")}`}/>
            )}
        </Container>        
    )
}