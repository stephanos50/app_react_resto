import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Col, Form, Row, Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { format } from 'date-fns';




const SearchInvoice = (props) => {
    
    const [query, setQuery] = useState('')
    const { invoices } = props
    const { deleteInvoiceHandler} = props
    
    let total = 0
    
    const showingInvoice = query === ''
        ? invoices
        : invoices.filter((c) => (
            c.date_createAt.toLowerCase().includes(query.toLowerCase())
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
                  placeholder="Recherche par date ..."  
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                />
                </Col>
        </Form.Group>
           
        <Table striped bordered hover responsive className='table-sm'>
       
                     <thead>
                         <tr>
                            <th>Numéro</th>
                            <th>
                            <strong
                                type="button"
                                style={{color: "#AF1025"}}
                                onClick={() => props.requestSort('date_createAt')}
                                className={props.getClassNamesFor('date_createAt')}
                                >
                                Date
                            </strong>

                            </th>
                            <th><strong
                                type="button"
                                style={{color: "#AF1025"}}
                                onClick={() => props.requestSort('total')}
                                className={props.getClassNamesFor('total')}
                                >
                                Total
                            </strong></th>
                            <th>###</th>
                        </tr>
                     </thead>
                     <tbody>
              
                     { showingInvoice.map((item) =>  
                          <tr key={item.id}>
                                 <td>{item.number}</td>
                                 <td>{format(new Date(item.createAt),'dd-MM-yyyy')}</td>
                                 <td>{item.total} €{props.setstate(total += item.total)}</td>
                                 
                                 <td> <Link   key={item.id} to={{
                                     pathname:`invoice/${item.id}`,
                                     }}><Button className='btn-sm'><i className="fa fa-eye"></i></Button></Link>
                                     <Button variant="danger" className='btn-sm'><i className='fa fa-trash'
                                         onClick={() => deleteInvoiceHandler(item.id)}
                                     ></i></Button>
                                 </td>
                             </tr>
                            
                         
                     )}
                     <tr>
                         <td></td>
                         <td><strong>Total</strong></td>
                         <td><strong>{total}</strong></td>
                         <td></td>
                     </tr>
                     
                 </tbody>
             </Table>
            
      </>
    )
}


SearchInvoice.propTypes = {
    products: PropTypes.array.isRequired,
}

export default SearchInvoice;
