import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
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
         <Navbar bg="transparent" variant="light" expand="lg" collapseOnSelect className="text-capitalize" >
            <Container> 
             <LinkContainer to="/"> 
                <Navbar.Brand>
                <img src="/images/logo/logo.jpg" className="d-inline-block align-top" alt="Coeur Bleu Logo" /> 
               </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className=" ms-auto ml-auto">

                  <LinkContainer to="/cart"> 
                    <Nav.Link>
                      <li className="fas fa-shopping-cart"></li> Panier
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/contact"> 
                    <Nav.Link>
                      <li className="fas fa-address-card"></li> Contact
                    </Nav.Link>
                  </LinkContainer>
                 
                  <LinkContainer to="/info" > 
                    <Nav.Link>
                      <li className="fas fa-info"></li> Info
                    </Nav.Link>
                  </LinkContainer>
                  
               
                  { userInfo   ? (
                      <NavDropdown title={userInfo.first_name} className="text-capitalize" id="user">
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                          Se déconnecter
                        </NavDropdown.Item>
                      </NavDropdown>

                  ) : (
                  
                      <LinkContainer to="/login">
                      <Nav.Link>
                        <li className="fas fa-user3"></li> Se connecter
                      </Nav.Link>
                      </LinkContainer>
                  
                  
                  )}
                  {userInfo   && ( userInfo.role === 'admin' ) && (
                      <NavDropdown title="admin" className="text-capitalize" id="role">
                        <LinkContainer to='/admin/orderlist'>
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                  </NavDropdown>
                  )}
                   {userInfo   && (userInfo.role === 'livreur') && (
                      <NavDropdown title="livreur" className="text-capitalize" id="role">
                          <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item id="text-livreur">Dashboard</NavDropdown.Item>
                          </LinkContainer>
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