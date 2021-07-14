import React, { useState, useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../composants/Product'
import axios from 'axios'

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async () => {
            const res = await axios.get('/api/products')
            setProducts(res.data)
        }
        fetchProducts()
    }, []);
    return (
        <>
            <h1 className='p-3'>Nos plats à emporté</h1>
            <Row>
                {products.map(product =>(
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                    
                ))}
            </Row>
        </>
    )
}

export default Home;