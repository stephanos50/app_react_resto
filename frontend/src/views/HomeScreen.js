import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Row, Col, Nav} from 'react-bootstrap'
import Product from '../composants/Product'
import Loader from '../composants/Loader'
import Message from '../composants/Message'
import { listProducts } from '../actions/productAction'


const HomeScreem = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    
    const { loading, error, products} = productList
    
    const [value, setValue] = useState(1)

    useEffect(()=>{
        dispatch(listProducts())
    }, [dispatch]);

  
  

    return (
        <>
            <h3 className='p-3'>Nos plats a emporter</h3>
            <Nav as="ul">
                <Nav.Item as="li">
                    <Nav.Link onClick={()=> setValue(1)} ><h5>Nos entrées</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link  onClick={()=> setValue(2)} ><h5>Nos plats</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link onClick={()=>setValue(3)}><h5>Nos suggestions</h5></Nav.Link>
                </Nav.Item>
            </Nav>
          
           
            {loading ? (
                <Loader />
            ) : error ? ( 
               <Message variant='danger'>{error}</Message>
             ) : ( 
                <Row>
                    {products.map((product, index) => (
                        product.categoryId === value ?
                            <Col key={index} sm={12} md={6} lg={4} xl={3}>
                                <Product 
                                  product={product} 
                                /> 
                            </Col>
                         : ''
                ))}
          </Row>
             )}
            
        </>
    )
}

export default HomeScreem;