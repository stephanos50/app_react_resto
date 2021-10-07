import React from 'react'
import { Navbar, Nav, Container, NavDropdown,Dropdown, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions'


const Header = () => {
    
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
      dispatch(logout())
    }
    return (
      
        <header>
         <Navbar bg="transparent" variant="light" expand="lg" collapseOnSelect className="text-capitalize">
            <Container> 
             <LinkContainer to="/"> 
                <Navbar.Brand>
                <img src="/images/logo/logo.jpg" className="d-inline-block align-top" alt="Coeur Bleu Logo" /> 
               </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
              <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className=" ms-auto ml-auto">

                  <LinkContainer to="/cart"> 
                    <Nav.Link id="panier">
                      <li className="fas fa-shopping-cart"></li> Panier
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/contact"> 
                    <Nav.Link id="contact">
                      <li className="fas fa-address-card"></li> Contact
                    </Nav.Link>
                  </LinkContainer>
                 
                  <LinkContainer to="/info" > 
                    <Nav.Link id="info">
                      <li className="fas fa-info"></li> info
                    </Nav.Link>
                  </LinkContainer>
                  
               
                  { userInfo  && userInfo.role === 'client'
                  ? (
                      <NavDropdown title={userInfo.first_name} className="text-uppercase font-weight-bold">
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item id="text-profile">Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler} id="text-profile">
                          Se déconnecter
                        </NavDropdown.Item>
                      </NavDropdown>

                  ) : (userInfo && (userInfo.role == 'admin' || userInfo.role == 'livreur')) ? '' :
                  
                      <LinkContainer to="/login">
                      <Nav.Link id="panier">
                        <li className="fas fa-user3"></li> Se connecter
                      </Nav.Link>
                      </LinkContainer>
                  
                  
                  }
                  {userInfo   && ( userInfo.role === 'admin' ) && (
                      <NavDropdown title='admin' class="font-weight-bold" >
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/userlist'>
                          <NavDropdown.Item>Utilisateurs</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productlist'>
                          <NavDropdown.Item >produits</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                          <NavDropdown.Item i>commandes</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/categorylist'>
                          <NavDropdown.Item >categories</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler} id="text-admin">
                        <Dropdown.Divider  />
                          Se déconnecter
                        </NavDropdown.Item>
                       
                      </NavDropdown>
                  )}
                   {userInfo   && (userInfo.role === 'livreur') && (
                      <NavDropdown title='livreur'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item id="text-profile">profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                         <NavDropdown.Item id="text-livreur">commandes</NavDropdown.Item>
                       </LinkContainer>
                       <NavDropdown.Item onClick={logoutHandler} id="text-livreur">
                        Se déconnecter
                      </NavDropdown.Item>
                      </NavDropdown>
                  )}
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      
    )
}

export default Header;