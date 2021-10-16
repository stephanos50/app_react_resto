import React, {useEffect} from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Redirect } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'


const DashboardHeader = ( props) => {
    const { role } = props;
  
   
    


    return (
        <Navbar bg="transparent" variant="light" expand="lg" collapseOnSelect className="text-capitalize" >
            { role === 'admin' ? <>
                <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>utilisateurs</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item >produits</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>commandes</NavDropdown.Item>
                </LinkContainer>

                 <LinkContainer to='/admin/categorylist'>
                    <NavDropdown.Item >categories</NavDropdown.Item>
                 </LinkContainer>

                <LinkContainer to='/admin/reviewsuserlist'>
                     <NavDropdown.Item >commentaires</NavDropdown.Item>
                </LinkContainer>

                 <LinkContainer to='/admin/invoicesuserlist'>
                    <NavDropdown.Item >factures</NavDropdown.Item>
                 </LinkContainer>
             </>: (
                <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>commandes</NavDropdown.Item>
                </LinkContainer>
             )
            }
           
                        
        </Navbar>

      
    )
}




export default DashboardHeader