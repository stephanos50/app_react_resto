import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const InfoView = () => {
    return (
      <Container> 
        <Row>
          <Col>
            <h5>Paiement</h5>
            <h6> <strong>PayPal: </strong> sb-wxpdt7212645@personal.example.com</h6>
            <h6><strong>Password: </strong> JwX6#rYs </h6>
            <h5>Utilisateur</h5>
            <h6> <strong>Admin: </strong> root@exemple.be</h6>
            <h6> <strong>Client: </strong> stefan@exemple.be</h6>
            <h6> <strong>Livreur: </strong> alpha@exemple.be</h6>
            <h5>Password</h5>
            <h6> <strong>Password identique:</strong> password </h6>
            <h5>Eamil</h5>
            <h6><strong>MailTrap: </strong><a href="https://mailtrap.io"> https://mailtrap.io/</a></h6>
            <h6><strong>Email: </strong> tfe.coeurbleu@gmail.com</h6>
            <h6><strong>Mot de passe: </strong> azerty!123</h6>
          </Col>
          <Col>
          <Link to='/' className='m-3'> <Button> Retour </Button></Link>
          </Col>
        </Row>
       

      </Container>

    )
}
