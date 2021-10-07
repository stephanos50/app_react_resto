import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'



const CheckoutSteps = ({ step1, step2, step3 }) => {
    return (
        <Nav className='justify-content-center mb-4 '>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Se connecter</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Se connecter</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Adresse</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Adresse</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Commande</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Commande</Nav.Link>
                )}
            </Nav.Item>

            
        </Nav>
    )
}

export default CheckoutSteps