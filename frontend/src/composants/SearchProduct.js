import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import { Button, Table, Form, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'



const SearchProduct = (props) => {
    const [query, setQuery] = useState('')
    const { products } = props

    const showingProducts = query === ''
        ? products
        : products.filter((c) => (
            c.name.toLowerCase().includes(query.toLowerCase())
        ))

    const updateQuery = (query) => {
        setQuery(query.trim())
    }
   
   
    return (
      <>
        <Form.Group  as={Row} className="mb-3" controlId="name">
            
            <Col sm='3'>
                <Form.Control 
                  type="text" 
                  placeholder="Recherche par nom ..."  
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                />
                </Col>
        </Form.Group>
           
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
               
                <th></th>
              </tr>
            </thead>
            <tbody>
              {showingProducts.map((product) => (
              
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}€</td>
                  <td>{product.category.name}</td>
                  
                  
                  <td>
                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => props.deleteHandler(product.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
            
      </>
    )
}


SearchProduct.propTypes = {
    products: PropTypes.array.isRequired,
}

export default SearchProduct;
