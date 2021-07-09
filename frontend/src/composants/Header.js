import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'


const Header = () => {
    return (
        <header>
          <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container> 
              <Navbar.Brand href="/">Au Coeur Bleau</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className=" ms-auto ml-auto">
                  <Nav.Link href="/Panier">
                    <li className="fas fa-shopping-cart"></li>Panier
                  </Nav.Link>
                  <Nav.Link href="/Connectez-vous">
                    <li className="fas fa-user"></li>Connectez-vous
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      
    )
}

export default Header;