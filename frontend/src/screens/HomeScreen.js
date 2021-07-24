import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../composants/Product'
import Loader from '../composants/Loader'
import Message from '../composants/Message'
import { listProducts } from '../actions/productAction'


const HomeScreem = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList
    
    useEffect(()=>{
        dispatch(listProducts())
    }, [dispatch]);
    
   
    return (
        <>
            <h1 className='p-3'>Nos plats à emporté</h1>
            {loading ? (
                <Loader />
            ) : error ? ( 
               <Message variant='danger'>{error}</Message>
             ) : ( 
                <Row>
                {products.map(product =>(
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                    
                ))}
               </Row>
             )}
            
        </>
    )
}

export default HomeScreem;