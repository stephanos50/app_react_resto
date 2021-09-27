import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap'
import Message from '../composants/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'
import PictureCart from '../composants/PictureCart'


const CartScreem = ({match, location, history}) => {
   
    const productId = match.params.id

    const quantities = [0,1,2,3,4]

    const qty =  Number(location.search.split('=')[1])
    
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const { cartItems } = cart

    
   
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
   
    return (
        <Row>
            <Col md={8}>
                <h1>Votre panier</h1>
                <Link to='/' className='p-4'>
                    <Button variant="primary">Retour</Button>
                 </Link>
                {Object(cartItems) === undefined ? (<Message>Votre panier est vide<Link to='/'> Retour</Link></Message> 
                ) : (
                
                <ListGroup variant='flush'>
                    {cartItems.map((item) =>(
                        <ListGroup.Item key={item.id}>
                            <Row>
                                <Col md={2} className='t-9 images'> <PictureCart value={item}/></Col>
                                <Col md={3}  className='mt-4'>
                                    <Link to={`/products/${item.id}`}>
                                        <h6>{item.name}</h6>
                                    </Link>
                                    
                                </Col>
                                <Col sm={2} className='mt-4'> <h6>{item.price} €</h6></Col>
                                <Col sm={2} className='mt-3'>
                                    <Form.Control 
                                        as='select' 
                                        value={item.qty} 
                                        onChange={(e) => dispatch(addToCart(item.id, Number(e.target.value)))}>
                                       {
                                           [ ...Array(quantities.length).keys()].map((x) =>(
                                            <option key={x + 1 } value={x + 1 }>
                                                {x + 1 }
                                            </option>
                                        ))
                                       }
                                    </Form.Control>
                                </Col>
                                <Col sm={2} className='mt-3'>
                                    <Button type='button' variant='delete' onClick={() =>removeFromCartHandler(item.id)} >
                                        <li className='fas fa-trash'></li>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>)}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>
                                Sous-total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) 
                                produits
                            </h3>
                                {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} - Euro
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                 type='button'
                                 className='btn'
                                 
                                 disabled={Object.keys(cartItems).length === 0}
                                 onClick={checkoutHandler}
                            >Valider votre commande</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            <Col md={2}></Col>
        </Row>
    )
}

export default CartScreem