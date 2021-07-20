
import { Row,Col } from 'react-bootstrap' 

const Allergene = (props) => {
    const allergene = props.value.map((item) => ` ${item.nom}  `)
        return(
            <Row>
                <Col>
                    <i> { allergene } </i>
                </Col>
            </Row>
        )
}
export default Allergene;