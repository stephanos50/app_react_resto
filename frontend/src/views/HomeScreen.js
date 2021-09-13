import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Row, Col, Nav} from 'react-bootstrap'
import Product from '../composants/Product'
import Loader from '../composants/Loader'
import Message from '../composants/Message'
import { listProducts } from '../actions/productAction'
import { listCategory } from '../actions/categoryAction'


const HomeScreem = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList

    const categoryList = useSelector(state => state.categoryList)
    const { loading: loadingCategories, error: errorCategories, categories} = categoryList

    
    const [value, setValue] = useState(1)

    useEffect(()=>{
        dispatch(listProducts())
        dispatch(listCategory())
    }, [dispatch]);

    return (
        <>
            <Nav as="ul">
                {categories.map((category) => 
                    <Nav.Item as="li" key={category.id}>
                        <Nav.Link onClick={()=> setValue(category.id)} ><h5 className="p-2">{category.name}</h5></Nav.Link>
                    </Nav.Item>
                )}
            </Nav>
          
           
            {loading ? (
                <Loader />
            ) : error ? ( 
               <Message variant='danger'>{error}</Message>
             ) : ( 
                <Row>
                    {products.map((product) => (
                        product.categoryId === value ?
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
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