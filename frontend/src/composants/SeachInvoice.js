import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Col, Form, Row, Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'





const SearchInvoice = (props) => {

    const [query, setQuery] = useState('')
    const { invoices } = props
    const { deleteInvoiceHandler} = props
    
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
                            <a
                                type="button"
                                style={{color: "#AF1025"}}
                                onClick={() => props.requestSort('date_createAt')}
                                className={props.getClassNamesFor('date_createAt')}
                                >
                                Date
                            </a>

                            </th>
                            <th><a
                                type="button"
                                style={{color: "#AF1025"}}
                                onClick={() => props.requestSort('total')}
                                className={props.getClassNamesFor('total')}
                                >
                                Total
                            </a></th>
                            <th>###</th>
                        </tr>
                     </thead>
                     <tbody>
              
                     { showingInvoice.map((item) =>  
                          <tr key={item.id}>
                                 <td>{item.number}</td>
                                 <td>{item.date_createAt.split(',')[0]}</td>
                                 <td>{item.total} €</td>
                                 
                                 <td> <Link   key={item.id} to={{
                                     pathname:`invoice/${item.id}`,
                                     }}><Button className='btn-sm'><i className="fa fa-eye"></i></Button></Link>
                                     <Button variant="danger" className='btn-sm'><i className='fa fa-trash'
                                         onClick={() => deleteInvoiceHandler(item.id)}
                                     ></i></Button>
                                 </td>
                             </tr>
                            
                         
                     )}
                     
                 </tbody>
             </Table>
            
      </>
    )
}


SearchInvoice.propTypes = {
    products: PropTypes.array.isRequired,
}

export default SearchInvoice;
