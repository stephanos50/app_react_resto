import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../composants/Product'
import products from '../products'

const Home = () => {
    return (
        <div>
            <h1>Nos plats à emporté</h1>
            <Row>
                {products.map(product =>(
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                    
                ))}
            </Row>
        </div>
    )
}

export default Home;