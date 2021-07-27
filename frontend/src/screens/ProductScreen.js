import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Assess from '../composants/Assess'
import Picture from '../composants/Picture'
import Allergene from '../composants/Allergene'
import { listProductDetails } from '../actions/productAction'
import Loader from '../composants/Loader'
import Message from '../composants/Message'



const Product = ({history, match}) => {

    

    const quantities = [0,1,2,3,4]
   
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.listProductDetails)

    const { loading, error, product} = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch,match])
   
    if (!product.Images ) return null;

    const addToCartHandler = () => {
        history.push(`/panier/${match.params.id}?qty=${qty}`)
    }
    
    
    return (
        <>
            <Link to='/' className='pb-4'>
                <Button variant="primary">Retour</Button>
           </Link>
           {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (  
                <>               
                    <Row>
                        <Picture value={product.Images} />
                    
                        <Col className="p-3" sm={12} md={6} lg={4} xl={4} >
                            <ListGroup variant='flush'>
                                <h5>{product.plat}</h5>
                                <Assess value={product.cote} />
                                <p> Prix : {product.prix} euro</p>
                            </ListGroup>
                        </Col>
    
                        <Col className="p-3" sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>{product.prix}</strong> euro
                                            </Col>
                                        </Row>
        
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantité</Col>
                                            <Col>
                                                <Form.Control 
                                                    as='select' 
                                                    value={qty} 
                                                    onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [ ...Array(quantities.length).keys()].map((x) =>(
                                                                <option key={x + 1 } value={x + 1 }>
                                                                    {x + 1 }
                                                                </option>
                                                            ))
                                                        }
                                                        

                                                </Form.Control>
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button 
                                        onClick={addToCartHandler}
                                            className='btn'
                                            type='button'
                                        >
                                            Ajouter au panier
                                        </Button>
                                    </ListGroup.Item>
        
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                
                    <Row>
                        <Col md={6} className="p-3">
                            <h4>Déscription</h4>
                            <p>{product.description}</p>
                        </Col>
                    </Row>


                    <Row>
                        <Col md={6} className="p-3">
                            <h4>Allergene</h4>
                            <Allergene value={product.Allergenes} />
                            
                        </Col>
                    </Row>
                </>
 
               
           )}
           
           
        </>
    )
}

export default Product
