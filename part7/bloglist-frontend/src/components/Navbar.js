import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigationbar = ( {name} ) => {
    const padding = {
        paddingRight: 5
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
                <Link style={padding} to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                {name} logged in
            </Nav.Link>
            <Nav.Link href="#" as="span">
                <button type="submit" onClick={() => window.localStorage.removeItem('loggedInUser')} form="logout">Logout</button>
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigationbar