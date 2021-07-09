import {Container, Row, Col} from 'react-bootstrap'
import Home from '../screens/Home'

const Section = () => {
    return (
        <section> 
             <Container>
                 <Row>
                     <Col> <h1>Au Coeur Bleu</h1> </Col>
                 </Row>
                 <Home />
                
            </Container>
        </section>
       
    )
      
}

export default Section;