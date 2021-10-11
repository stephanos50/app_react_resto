import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form, Image } from 'react-bootstrap'
import Assess from '../composants/Assess'
import { listProductDetails, createProductReview } from '../actions/productAction'
import Loader from '../composants/Loader'
import Message from '../composants/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Allergen from '../composants/Allergen'
import Review from '../composants/Review'


const Product = ({history, match}) => {
    
    const quantities = [0,1,2,3,4]
   
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product} = productDetails

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const { loading: loadingProductReview, success: successProductReview, error: errorproductReview} = productReviewCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo} = userLogin
    
    
   

    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
        }
        if (!product.id || product.id !== match.params.id) {
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET})
            dispatch(listProductDetails(match.params.id))
        }
        // eslint-disable-next-line
    }, [dispatch, match, successProductReview])
   

    
    if (!product.price ) return null;
    

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment,
        }))
    }
    
    return ( 
        <>
       
        <Link to='/' className='pb-4 form-review'>
            <Button variant="primary">Retour</Button>
        </Link>
        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <>  
            <Row>
               <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="p-3">
                    <Image  style={{ width: '12rem' }} src={product.url}  />
                </Col>
                    <Col className="p-3" sm={12} md={6} lg={4} xl={4} >
                        <ListGroup variant='flush'>
                            <h4>{product.name}</h4>
                            <i className='price-product p-2'> Prix : {product.price} euro</i>
                            </ListGroup>
                        <div className='product_assess'><Assess value={product.rate} /></div>
                    </Col>
                   
                    <Col className="p-3" sm={12} md={6} lg={4} xl={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col className='price-product p-2'> Price: </Col>
                                        <Col className='price-product p-2'> <strong>{product.price}</strong> euro </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col className='price-product p-2'>Quantité</Col>
                                        <Col>
                                            <Form.Control 
                                            className='price-product p-2'
                                                as='select' 
                                                value={qty} 
                                                onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [ ...Array(quantities.length).keys()].map((x) =>(
                                                            <option key={x + 1 } value={x + 1 }> {x + 1 } </option>
                                                            ))
                                                    }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item className="form-review">
                                    <Button 
                                        onClick={addToCartHandler}
                                            className='btn'
                                            type='button'
                                        >Ajouter au panier</Button>
                                </ListGroup.Item>
                            </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                
                    <Row>
                        <Col md={6} className="p-3">
                            <h4 className='desctiprion-allergene'>Déscription</h4>
                            <i className='description'>{product.description}</i>
                        </Col>
                    </Row>

                    <Row>
                    <Row>
                        <Allergen allergens = {product.allergens} />
                    </Row>
                        
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h4 className='desctiprion-allergene'>Commentaires</h4>
                            
                            <Review review={product.reviews} />
                           
                            <ListGroup>
                                {successProductReview && (
                                    <Message variant='success'>
                                        Review submitted successfully
                                    </Message>
                                )}
                                {loadingProductReview && <Loader />}
                               
                                {errorproductReview && <Message variant='danger'>{errorproductReview}</Message>}
                                { userInfo && ( 
                                   
                                      <Form onSubmit= {submitHandler}  className='form-review'>
                                          <Form.Group controlId='rating'>
                                              <Form.Label className='form-title-input'>Rating</Form.Label>
                                              <Form.Control
                                                className='form-review' 
                                                as='select' 
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Insuffisant</option>
                                                    <option value='2'>2 - Acceptable</option>
                                                    <option value='3'>3 - Bon</option>
                                                    <option value='4'>4 - Délicieux</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                          </Form.Group>
                                          <Form.Group>
                                                <Form.Label className='form-title-input'>Commentaire</Form.Label>
                                                <Form.Control 
                                                    as='textarea' 
                                                    row='3' 
                                                    placeholder=" max 30 caractères"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                          </Form.Group>
                                          <br></br>
                                          <Button type='submit' variant='primary' >Submit</Button>
                                      </Form>
                                 )}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default Product
