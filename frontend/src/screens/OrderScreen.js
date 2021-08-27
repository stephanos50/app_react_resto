
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, ListGroup, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../composants/Message'
import { PayPalButton}  from 'react-paypal-button-v2'
import Loader from '../composants/Loader'

import { getOrderDetails, payOrder } from '../actions/orderAction'

import { ORDER_PAY_RESET} from '../constants/orderConstants'


const OrderScreen = ({match}) => {

    const orderId  = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails) 
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
  
    useEffect(() => {
       
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
              setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay || order.id !== Number(orderId) ){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else {
                setSdkReady(true)
            }
        }
     },[dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
      }
    

     
      

    return loading ? <Loader /> : error ?  <Message variant='error'>{error}</Message> : <>
        <h1>Order {order.number}</h1>
        <h5>Commande du {order.createAt} à {order.time}</h5>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Adresse de livraison</h2>
                                <h6> <strong> Name: </strong>   {`${order.user.first_name}`} </h6>
                            
                            
                            <h6>  <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email} </a></h6>
                           
                           
                                <ListGroup variant='flush'>
                                    <h6> <strong>Address: </strong> 
                                        {order.address.name} 
                                        - numéro: {order.address.number} 
                                        - étage: {order.address.floor}</h6>
                                    
                                    <h6> <strong>Commune: </strong> {order.address.city.zip} - {order.address.city.name}</h6>

                                    {order.isDelivered ? <Message variant='success'> Delivered </Message> : <Message variant='danger'>Not Delivered </Message>}

                                </ListGroup>
                            
                            <br></br>
                          
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <h6> <strong>Methode: </strong> {order.paymentMethod} </h6>
                            {order.isPaid ? <Message variant='success'>Paid on </Message> : <Message variant='danger'>Not Paid</Message>}
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {Object.keys(order.product0rders).length === 0   ? window.location.reload(false) : (
                                <ListGroup variant='flush'>
                                    {order.product0rders.map((item, index) => (
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
                           
                            {!order.isPaid && (
                                <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                    amount={order.total}
                                    onSuccess={successPaymentHandler}
                                    />
                                )}
                                </ListGroup.Item>
                            )}
                           
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    
    </>
       

}

export default OrderScreen