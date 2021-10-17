import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import { Button, Table, Form, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../composants/Message'




const SearchOrder = (props) => {
    const [query, setQuery] = useState('')
    const { orders } = props
    const showingContacts = query === ''
        ? orders
        : orders.filter((c) => (
            c.number.toLowerCase().includes(query.toLowerCase())
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
                  placeholder="Numéro de commande ..."  
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                />
                </Col>
        </Form.Group>
        {(showingContacts.length === 0) ? (<Message>Aucune commande facturé</Message>) : ( 
               <Table striped bordered hover responsive className='table-sm'>
               <thead>
                 <tr>
                   <th>Numéro</th>
                   <th>Client</th>
                   <th>Date</th>
                   <th>Total</th>
                   <th>Payer</th>
                   <th>Livrer</th>
                   <th></th>
                 </tr>
               </thead>
              
               <tbody>
              
                 {showingContacts.map((order) => (
                  <tr key={order.id}>
                    <td>{order.number}</td>
                    <td>{order.user.first_name}</td>
                    <td>{order.date_createAt}</td>
                    <td>{order.total} €</td>
                    <td>
                     {order.payment  ? (
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
                       <LinkContainer to={`/admin/order/${order.id}`}>
                         <Button variant='light' className='btn-sm'>
                           Details
                         </Button>
                       </LinkContainer>
                     </td>
                  </tr>
                ))}
               </tbody>
           </Table>      
        )}
       
      </>
    )
}


SearchOrder.propTypes = {
    orders: PropTypes.array.isRequired,
}

export default SearchOrder;
