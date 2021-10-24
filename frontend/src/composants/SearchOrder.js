import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import { Button, Table, Form, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../composants/Message'
import { format } from 'date-fns';





const SearchOrder = (props) => {
    const [query, setQuery] = useState('')
    const { orders } = props
    const date = format(new Date(),'yyyy-MM-dd')
  
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
                   <th> 
                      <strong
                        type="button"
                        style={{color: "#AF1025"}}
                        onClick={() => props.requestSort('createAt')}
                        className={props.getClassNamesFor('createAt')}
                      >
                      Date
                      </strong>
                    </th>
                   <th>
                   <strong
                        type="button"
                        style={{color: "#AF1025"}}
                        onClick={() => props.requestSort('total')}
                        className={props.getClassNamesFor('total')}
                      >
                      Total
                      </strong>


                   </th>
                   <th>Payer</th>
                   <th>Livrer</th>
                   <th></th>
                 </tr>
               </thead>
              
               <tbody>
              
                 {showingContacts.map((order) => (
                   format(new Date(order.createAt),'yyyy-MM-dd') === date && 
                    <tr key={order.id}>
                    <td>{order.number}</td>
                    <td>{order.user.first_name}</td>
                    <td>{format(new Date(order.createAt),'dd-MM-yyyy')}</td>
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
                         <Button variant='primary' className='btn-sm'>
                           
                         <i className='fas fa-edit'></i>
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
