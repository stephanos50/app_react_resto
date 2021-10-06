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
         <Navbar bg="transparent" variant="light" expand="lg" collapseOnSelect>
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
                    <Nav.Link>
                      <li className="fas fa-shopping-cart"></li> Panier
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/contact"> 
                    <Nav.Link>
                      <li className="fas fa-address-card"></li> Contact
                    </Nav.Link>
                  </LinkContainer>
                 
                  <LinkContainer to="/info"> 
                    <Nav.Link>
                      <li className="fas fa-info"></li> info
                    </Nav.Link>
                  </LinkContainer>
                  
               
                  { (userInfo && userInfo.role == 'client') 
                  ? (
                      <NavDropdown title={userInfo.first_name} id='first_name'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                          Se déconnecter
                        </NavDropdown.Item>
                      </NavDropdown>

                  ) : (userInfo && (userInfo.role == 'admin' || userInfo.role == 'livreur')) ? '' :
                  
                      <LinkContainer to="/login">
                      <Nav.Link>
                        <li className="fas fa-user3"></li> Se connecter
                      </Nav.Link>
                      </LinkContainer>
                  
                  
                  }
                  {userInfo   && ( userInfo.role === 'admin' ) && (
                      <NavDropdown title='Admin' id='adminmenu'>
                        <LinkContainer to='/admin/userlist'>
                          <NavDropdown.Item>Utilisateurs</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productlist'>
                          <NavDropdown.Item>La carte</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                          <NavDropdown.Item>Les commandes</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/categorylist'>
                          <NavDropdown.Item>Les categories</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                        <Dropdown.Divider />
                          Se déconnecter
                        </NavDropdown.Item>
                       
                      </NavDropdown>
                  )}
                   {userInfo   && (userInfo.role === 'livreur') && (
                       <NavDropdown title='Livreur' id='livreurmenu'>
                        <LinkContainer to='/admin/orderlist'>
                         <NavDropdown.Item>Les commandes</NavDropdown.Item>
                       </LinkContainer>
                       <NavDropdown.Item onClick={logoutHandler}>
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