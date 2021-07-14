import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Assess from '../composants/Assess'
import axios from 'axios'


const Product = ({match}) => {
    const [ product, setProduct] = useState({})

    useEffect( () => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [match])
    
    return (
        <div>
            <Link className="btn" to='/'>
                Retour
            </Link>
            <Row>
                <Col md={3}>
                    <Image src={product.image}  alt={product.name} width={200} />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <h5>{product.nom}</h5>
                        <Assess value={product.evaluation} />
                        <p> Prix : {product.prix} euro</p>
                    </ListGroup>
                </Col>
                <Col md={3}>
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
                                <Button className='btn'>
                                    Ajouter au panier
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h3>Déscription</h3>
                    <p>{product.description}</p>
                </Col>
            </Row>


            <Row>
            <Col  md={6}>
                    <h3>Allergene</h3>
                    <p>{product.allergennes}</p>
                </Col>
               
            </Row>
        </div>
    )
}

export default Product
