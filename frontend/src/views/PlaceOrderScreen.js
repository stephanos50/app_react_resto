
import { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../composants/Message'
import CheckoutSteps from  '../composants/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { createOrder } from '../actions/orderAction'


const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }


    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    
    cart.totalPrice = cart.itemsPrice

    const orderCreate = useSelector((state) => state.orderCreate) 
    const { order, success, error } = orderCreate
   
    
    useEffect(() => {
       
        if(success){
            history.push(`/order/${order.id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
            
        }// eslint-disable-next-line
    },[history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            cartItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            user: userInfo.email
        }))
    }
   
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Adresse de livraison</h2>
                            <h6>
                               { cart.shippingAddress.name } ,
                                numéro: { cart.shippingAddress.number } ,
                                étage:  { cart.shippingAddress.floor }
                            </h6>
                            <h6>
                               <p>{cart.shippingAddress.city.zip} {cart.shippingAddress.city.name} </p>
                               
                            </h6>
                            <h6>{userInfo.email}</h6>
                        </ListGroup.Item>
                       
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col><h6>{item.name}</h6></Col>
                                                <Col md={4}><h6>{item.qty} x {item.price} € = {item.qty * item.price} €</h6></Col>
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
                                <Row>
                                    <Col><h2>Total</h2></Col>
                                    <Col><h2>{cart.totalPrice} €</h2></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block' 
                                    disabled={cart.cartItems === 0} 
                                    onClick={placeOrderHandler}>
                                    Valider la commande
                                </Button>

                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )

}

export default PlaceOrderScreen