
import { useEffect } from 'react'
import { Row, Col, ListGroup, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../composants/Message'

import Loader from '../composants/Loader'

import { getOrderDetails } from '../actions/orderAction'


const OrderScreen = ({match}) => {

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails) 
    
    const { order, loading, error } = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))
        // eslint-disable-next-line
    },[])

   
   
    


    return loading ? <Loader /> : error ?  <Message variant='error'>{error}</Message> : <>
        <h1>Order {order.id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            {order.address ===  undefined ? <Message>Your order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    <h6>{order.address.name} - numéro: {order.address.number} - étage: {order.address.floor}</h6>
                                    
                                    <h6>{order.address.city.zip} - {order.address.cityName}</h6>
                                </ListGroup>
                            )}
                          
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <h6><strong>Methode: </strong>{order.paymentMethod}</h6>
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.product_orders ===  undefined ? <Message>Your order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.product_orders.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col><h6>{item.productName}</h6></Col>
                                                <Col md={4}><h6>{item.quantity} x {item.prix} € = {item.quantity * item.prix} €</h6></Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2> Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><h6>Items</h6></Col>
                                    <Col><h6>{order.total} €</h6></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><h6>Shipping</h6></Col>
                                   
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><h6>Total</h6></Col>
                                    <Col><h6>{order.total} €</h6></Col>
                                </Row>
                            </ListGroup.Item>
                           
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    
    </>
       

}

export default OrderScreen