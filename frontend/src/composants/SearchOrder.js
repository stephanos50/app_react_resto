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
                   <th> 
                      <a
                        type="button"
                        style={{color: "#AF1025"}}
                        onClick={() => props.requestSort('createAt')}
                        className={props.getClassNamesFor('createAt')}
                      >
                      Date
                      </a>
                    </th>
                   <th>
                   <a
                        type="button"
                        style={{color: "#AF1025"}}
                        onClick={() => props.requestSort('total')}
                        className={props.getClassNamesFor('total')}
                      >
                      Total
                      </a>


                   </th>
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
                    <td>{order.date_createAt.split(',')[0]}</td>
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
                       { order.isDelivered && (
                            <LinkContainer to={`/admin/order/${order.id}`}>
                            <Button variant='danger' className='btn-sm'>
                            <i className='fas fa-trash'></i>
                            </Button>
                          </LinkContainer>
                       )

                       }
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
