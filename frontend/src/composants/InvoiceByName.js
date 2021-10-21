
import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import { Button, Table, Form, Col, Row } from 'react-bootstrap'
import NbrFacture from './NbrFacture'
import { Link } from 'react-router-dom'

 const InvoiceByName = (props) => {
    const [query, setQuery] = useState('')
    const { users } = props

    console.log(users)

    const { deleteHandler} = props
    const showingUsers = query === ''
        ? users
        : users.filter((c) => (
            c.first_name.toLowerCase().includes(query.toLowerCase())
        ))

    const updateQuery = (query) => {
        setQuery(query.trim())
    }
    return (
        <div>
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
              <th>Numéro</th>
              <th>
                <a
                  type="button"
                  style={{color: "#AF1025"}}
                  onClick={() => props.requestSort('first_name')}
                  className={props.getClassNamesFor('first_name')}
                > Nom </a>
              </th>
              <th>Prénom</th>
              <th>Couriel</th>
              <th> <a
                  type="button"
                  style={{color: "#AF1025"}}
                  onClick={() => props.requestSort('first_name')}
                  className={props.getClassNamesFor('first_name')}
                > Facture </a></th>
              <th>Lecture</th>
            </tr>
          </thead>
          <tbody>
            {showingUsers.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td> <a href={`mailto:${item.email}`}>{item.email}</a></td>
                    <td ><NbrFacture orders={item.orders}/></td>
                   
                
                
                <td>
                <Link to={`userinvoices/${item.id}`}><Button variant="primary" className="btn-sm"><i className="fa fa-eye"></i></Button></Link>
              
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
    )
}

InvoiceByName.propTypes = {
    users: PropTypes.array.isRequired,
}

export default InvoiceByName;
