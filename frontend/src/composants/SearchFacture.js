import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import {  Table, Form, Col, Row } from 'react-bootstrap'
import Message from '../composants/Message'
import { format } from 'date-fns';





const SearchFacture = (props) => {
    const [query, setQuery] = useState('')
    const { orders } = props
    const date = format(new Date(),'yyyy-MM-dd')

    let total = 0;

  
    const showingInvoice = query === ''
        ? orders
        : orders.filter((c) => (
            console.log(c.createAt),
            c.createAt.toLowerCase().includes(query.toLowerCase())
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
                  placeholder="année-mois-jour"  
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                />
                </Col>
        </Form.Group>
        
        {(showingInvoice.length === 0) ? (<Message>Aucune commande facturé</Message>) : ( 
              <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th><strong
                        type="button"
                        style={{color: "#AF1025"}}
                        onClick={() => props.requestSort('createAt')}
                        className={props.getClassNamesFor('createAt')}
                      >
                        Date</strong></th>
                  <th><strong
                        type="button"
                        style={{color: "#AF1025"}}
                        onClick={() => props.requestSort('userId')}
                        className={props.getClassNamesFor('userId')}
                      >
                        Nom</strong></th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                  {showingInvoice.map((item) => 
                    <tr key={item.uid}>
                      <td>{item.number}</td> 
                      <td>{format(new Date(item.createAt),'dd-MM-yyyy')}</td>
                      <td>{item.user.first_name}</td> 
                      <td>{item.total}{props.setstate(total += item.total)}</td> 
                      
                    </tr>
                  )}
                  <tr>
                      <td></td>
                      <td></td>
                      <td><strong>Total</strong></td>
                      <td><strong>{props.state}</strong></td>
                  </tr>
                  
                  <tr>
                    <td></td>
                    <td></td>
                    <td><strong>TVA 6%</strong></td>
                    <td><strong>{Math.round(((props.state/100*6) + Number.EPSILON) * 100) / 100}</strong></td>
                  </tr>
                  
              </tbody>
             
             
            </Table>
        )}
       
      </>
    )
}


SearchFacture.propTypes = {
    invoices: PropTypes.array.isRequired,
}

export default SearchFacture;
