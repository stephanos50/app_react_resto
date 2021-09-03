import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form, Image } from 'react-bootstrap'
import Assess from '../composants/Assess'
import { listProductDetails, createProductReview } from '../actions/productAction'
import Loader from '../composants/Loader'
import Message from '../composants/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


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
            console.log('successproductReview')
            setRating(0)
            setComment('')
            
        }
        if (!product.id || product.id !== match.params.id) {
            console.log('je suis reset')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET})
            dispatch(listProductDetails(match.params.id))
        }
    }, [dispatch,match, successProductReview])
   
    if (!product.pictures ) return null;
    if (!product.price ) return null;

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const picture = product.pictures.map((image) => image.path)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment,
        }))
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
               
                <Col key={picture} sm={12} md={6} lg={4} xl={3} className="p-3">
                    <Image  style={{ width: '12rem' }} src={picture}  />
                </Col>
                    <Col className="p-3" sm={12} md={6} lg={4} xl={4} >
                        <ListGroup variant='flush'>
                            <h4>{product.name}</h4>
                            
                            <h6> Prix : {product.price} euro</h6>
                        </ListGroup>
                        <div className='product_assess'><Assess value={product.cote} /></div>
                    </Col>
                   
                    <Col className="p-3" sm={12} md={6} lg={4} xl={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col> Price: </Col>
                                        <Col> <strong>{product.price}</strong> euro </Col>
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
                                                            <option key={x + 1 } value={x + 1 }> {x + 1 } </option>
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
                                        >Ajouter au panier</Button>
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
                            {
                                product.allergens.map((item) => <i key={item.id}> {item.name} </i>)
                            }
                           
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {Object.keys(product.reviews).length === 0 && <Message>No reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review.id}>
                                        <strong>{review.name}</strong>
                                        <Assess value={review.rate}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>    
                                ))}
                            </ListGroup>
                            <ListGroup>
                                {successProductReview && (
                                    <Message variant='success'>
                                    Review submitted successfully
                                    </Message>
                                )}
                                {loadingProductReview && <Loader />}
                               
                                {errorproductReview && <Message variant='danger'>{errorproductReview}</Message>}
                                { userInfo && ( 
                                   
                                      <Form onSubmit= {submitHandler}>
                                          <Form.Group controlId='rating'>
                                              <Form.Label>Rating</Form.Label>
                                              <Form.Control 
                                                as='select' 
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Goog</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                          </Form.Group>
                                          <Form.Group>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control 
                                                    as='textarea' 
                                                    row='3' 
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                          </Form.Group>
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
