import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const Header = () => {
    return (
        <header>
          <Navbar bg="transparent" variant="light" expand="lg" collapseOnSelect>
            <Container> 
              <LinkContainer to="/"> 
                <Navbar.Brand>
                <img src="images/logo.jpg" className="d-inline-block align-top" alt="Coeur Bleu Logo" /> 
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className=" ms-auto ml-auto">
                  <LinkContainer to="/panier"> 
                    <Nav.Link>
                      <li className="fas fa-shopping-cart p-3"></li>Panier
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/connectez-vous">
                    <Nav.Link>
                      <li className="fas fa-user p-3"></li>Connectez-vous
                    </Nav.Link>
                    </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      
    )
}

export default Header;