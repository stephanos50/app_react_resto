import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import Assess from '../composants/Assess'
import axios from 'axios'
import Picture from '../composants/Picture'
import Allergene from '../composants/Allergene'



const Product = ({match}) => {
   
    const [ product, setProduct] = useState({})
    useEffect( () => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`);
            setProduct(data);

        }
       fetchProduct()
    }, [match]);

    if (!product.Images) return null;
    
    
    return (
        <div>
            <Link to='/' className='pb-4'>
                <Button variant="primary">Retour</Button>
           </Link>
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
                                <Button className='btn'>
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
        </div>
    )
}

export default Product
