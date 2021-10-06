
import  PropTypes from 'prop-types'
import { ListGroup, Col, Row } from 'react-bootstrap'

const OrderItem = (props) => {
    const { order } = props
    console.log(order)
    return (
      <>
      
            <ListGroup variant='flush'>
                {order.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <Row>
                            <Col><h6>{item.product.name}</h6></Col>
                            <Col md={4}><h6>{item.quantity} x {item.product.price} € = {item.price} €</h6></Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        
    </>
    )
}


OrderItem.propTypes = {
    order: PropTypes.array.isRequired,
}

export default OrderItem;
