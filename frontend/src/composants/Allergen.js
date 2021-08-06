
import { Row,Col } from 'react-bootstrap' 

const Allergen = (props) => {
   
    const allergene = props.value.map((item) => ` ${item.name}  `)
        return(
            <Row>
                <Col>
                    <i> { allergene } </i>
                </Col>
            </Row>
        )
}
export default Allergen;