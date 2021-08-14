
import { Row,Col } from 'react-bootstrap' 

const Allergen = (props) => {
    
    const allergen = props.value
    const allergie = allergen.map((item) => ` ${item.name}  `)
        return(
            <Row>
                <Col>
                    <i> { allergie } </i>
                </Col>
            </Row>
        )
}
export default Allergen;