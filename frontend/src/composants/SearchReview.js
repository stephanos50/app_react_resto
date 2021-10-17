
import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import {Table, Form, Col, Row } from 'react-bootstrap'
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
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Couriel</th>
                            <th>Commentaire</th>
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
                               <td><Link to={`userreview/${item.id}`}>commentaires</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </div>
    )
}

SearchReview.propTypes = {
    reviews: PropTypes.array.isRequired,
}

export default SearchReview;
