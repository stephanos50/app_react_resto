
import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import {Table, Form, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

 const SearchReview = (props) => {

    const [query, setQuery] = useState('')
    
    const { users } = props
   

    const showingReviews = query === ''
        ? users
        : users.filter((c) => (
            c.first_name.toLowerCase().includes(query.toLowerCase())
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
                            <th>Numéro</th>
                            <th><strong
                                type="button"
                                style={{color: "#AF1025"}}
                                onClick={() => props.requestSort('first_name')}
                                className={props.getClassNamesFor('first_name')}
                                >
                                 Nom
                                </strong>
                            </th>
                            <th>Prénom</th>
                            <th>Courriel</th>
                            <th><strong
                                type="button"
                                style={{color: "#AF1025"}}
                                onClick={() => props.requestSort('reviews')}
                                className={props.getClassNamesFor('reviews')}
                                >
                                 Commentaire
                                </strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showingReviews.map((item) => (
                            
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td >{Object.keys(item.reviews).length}</td>
                                <td><Link to={`userreview/${item.id}`}>
                                        <Button variant='primary' className='btn-sm'><i className='fas fa-eye'></i></Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </>
    )
}

SearchReview.propTypes = {
    users: PropTypes.array.isRequired,
}

export default SearchReview;
