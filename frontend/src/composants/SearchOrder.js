import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import { Button, Table, Form, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'



const SearchOrder = (props) => {
    const [query, setQuery] = useState('')
    const { orders } = props
    const showingContacts = query === ''
        ? orders
        : orders.filter((c) => (
            c.user.first_name.toLowerCase().includes(query.toLowerCase())
        ))

    const updateQuery = (query) => {
        setQuery(query.trim())
    }
   
    return (
      <>
        <Form.Group  as={Row} className="mb-3" controlId="name">
            <Form.Label><h5>Search by name : </h5></Form.Label>
            <Col sm='3'>
                <Form.Control 
                  type="text" 
                  placeholder="Search orders by name ..."  
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                />
                </Col>
        </Form.Group>
           
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {showingContacts.map((order) => (
               <tr key={order.id}>
                 <td>{order.number}</td>
                 <td>{order.user.first_name}</td>
                 <td>{order.createAt}</td>
                 <td>{order.total} €</td>
                 <td>
                  {order.isPaid ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                  </td>
                  <td>
                  {order.isDelivered ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order.id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
               </tr>
             ))}
            </tbody>
        </Table>      
      </>
    )
}


SearchOrder.propTypes = {
    orders: PropTypes.array.isRequired,
}

export default SearchOrder;
