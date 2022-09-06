
import { Navbar, Collapse, Nav,Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function AppNavbar(){

    return(
        <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark appNavbar">
            <Container>
              <Navbar.Brand className="logo">Secuna Test</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  {
                    (localStorage.getItem('token') === null)
                    ?
                    <>
                    <Nav.Link as={Link} to="/signIn">Sign In</Nav.Link>
                    <Nav.Link as={Link} to="/register" eventKey="/register">Register</Nav.Link>
                    </>
                    :
                    <>
                    <Nav.Link as={Link} to="/SubmitReports">Reports</Nav.Link>
                    <Nav.Link as={Link} to="/SignOut">Sign Out</Nav.Link>
                    </>
                    
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};