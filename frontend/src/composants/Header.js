import React from 'react'
import { Navbar, Nav, Container, NavDropdown,Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions'


const Header = () => {
    let livreur = {};
    let admin = {};
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
      dispatch(logout())
    }
   
    if(userInfo){
       admin = userInfo.roles.find(element => element.name === 'admin');
       livreur = userInfo.roles.find(element => element.name === 'livreur');
    }
   
    return (
      
        <header>
         <Navbar bg="transparent" variant="light" expand="lg" collapseOnSelect>
            <Container> 
              <Row>
                <Col>
                <h6> <strong>PayPal :</strong> sb-wxpdt7212645@personal.example.com</h6>
                <h6><strong>Password :</strong> JwX6#rYs </h6>
                <hr></hr>
                  <h6> <strong>Admin :</strong> root@exemple.be</h6>
                  <h6> <strong>Client :</strong> stefan@exemple.be</h6>
                  <h6> <strong>Livreur :</strong> alpha@exemple.be</h6>
                  <hr></hr>
                  <h6> <strong>Password identique:</strong> password </h6>
                </Col>
                
              </Row>
                
               
               
               
               
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
                  { userInfo 
                  ? (
                    
                    <NavDropdown title={userInfo.first_name} id='first_name'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Se déconnecter
                      </NavDropdown.Item>
                    </NavDropdown>

                  ) : 
                  
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <li className="fas fa-user3"></li> Se connecter
                    </Nav.Link>
                    </LinkContainer>
                  }
                  {userInfo && admin  && (
                      <NavDropdown title='Admin' id='adminmenu'>
                        <LinkContainer to='/admin/userlist'>
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productlist'>
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/categorylist'>
                          <NavDropdown.Item>Category</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/allergenlist'>
                          <NavDropdown.Item>Allergen</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/rolelist'>
                          <NavDropdown.Item>Role</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                  )}
                   {userInfo && livreur  && (
                       <NavDropdown title='Livreur' id='livreurmenu'>
                        <LinkContainer to='/admin/orderlist'>
                         <NavDropdown.Item>Orders</NavDropdown.Item>
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