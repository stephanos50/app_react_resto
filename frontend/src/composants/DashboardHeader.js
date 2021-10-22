import React from 'react'
import { Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const DashboardHeader = ( props) => {
    const { role } = props;
  
   
   
    


    return (
        <Navbar bg="transparent" variant="light" expand="lg" collapseOnSelect className="text-capitalize flex-column" >
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
                    <NavDropdown.Item >facture</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to='/admin/factures'>
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