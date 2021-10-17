import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import { Table, Form, Col, Row } from 'react-bootstrap'
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
                            <th>Date</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                     </thead>
                     <tbody>
              
                     { showingInvoice.map((item) =>  
                          <tr key={item.id}>
                                 <td>{item.number}</td>
                                 <td>{item.date_createAt}</td>
                                 <td>{item.total} €</td>
                                 <td>{item.isDelivered}</td>
                                 <td> <Link  key={item.id} to={{
                                     pathname:`orders/${item.id}`,
                                     }}><i className="fa fa-eye p-2"></i></Link>
                                     <i className='fa fa-trash'
                                         onClick={() => deleteInvoiceHandler(item.id)}
                                     ></i>
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
