
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, ListGroup, Card, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import PayPal from '../composants/PayPal'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderAction'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants'
import OrderItem from '../composants/OrderItem'


const OrderScreen = ({match, history}) => {

    const orderId  = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails) 
    const { order, loading, error } = orderDetails
    
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin) 
    const { userInfo } = userLogin

    



    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
       
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
              setSdkReady(true)
            }
            console.log(script)
            document.body.appendChild(script)
        }
        if(!order ||  successPay || order.id !== Number(orderId) || successDeliver){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
            
            
        } else if(!order.payment){
            if(!window.paypal){
                addPayPalScript()
            }else {
                setSdkReady(true)
            }
        }
     },[dispatch, history, userInfo, orderId, successPay, successDeliver,order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
       
      }
    
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
     
      

    return loading ? <Loader /> : error ?  <Message variant='error'>{error}</Message> : <>
        <Row className='p-3'>
            <Col>
                <h3> Numéro: {order.date_number}</h3>
                <h3>Commande :  {order.date_createAt} heure: {order.date_time} </h3>
            </Col>
      
        </Row>
        
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Adresse de livraison</h2>
                            <h6> <strong> Name: </strong>   {`${order.user.first_name}`} </h6>
                            <h6>  <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email} </a></h6>
                            <ListGroup variant='flush'>
                                <h6> 
                                    <strong>Address: </strong> 
                                    {order.address.name} 
                                        - numéro: {order.address.number} 
                                        - étage: {order.address.floor}
                                </h6>
                                <h6> <strong>Commune: </strong> {order.address.city.zip} - {order.address.city.name}</h6>
                            </ListGroup>
                            <br></br>
                        </ListGroup.Item>
                        
                        {order.payment != null && 
                            <ListGroup.Item>
                                <h2>Livraison</h2>
                                {order.isDelivered ? <Message variant='success'> <h3>A été livrer</h3> </Message> : <Message variant='danger'><h3>N'est pas encore livrer</h3> </Message>}

                            </ListGroup.Item>
                        }

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {Object.keys(order.product0rders).length === 0   ? window.location.reload(false) : (
                                <OrderItem 
                                    order = {order.product0rders}
                                />
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
                           
                            { order.payment == null  && (
                               <PayPal 
                                    loadingPay={loadingPay}
                                    sdkReady={sdkReady}
                                    order={order.total}
                                    successPaymentHandler={successPaymentHandler}
                               />
                            )}
                        {loadingDeliver && <Loader />}

                        {userInfo && 
                            userInfo.isAdmin && 
                            order.payment && 
                            !order.isDelivered && (
                            <ListGroup.Item>
                            <Button  
                                type='button'
                                className='btn btn-block'
                                onClick={deliverHandler}>
                                Delivred
                            </Button>
                        </ListGroup.Item>
                        )}
                        
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    
    </>
       

}

export default OrderScreen