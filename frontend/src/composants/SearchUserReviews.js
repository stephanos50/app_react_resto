
import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import {Table, Form, Col, Row } from 'react-bootstrap'
import ProductReviews from '../composants/ProductReviews'
import { Link } from 'react-router-dom'

 const SearchUserReviews = (props) => {

    const [query, setQuery] = useState('')
    
    const { reviews } = props
    const {deleteReviewHandler} = props

    const showingReviews = query === ''
        ? reviews
        : reviews.filter((c) => (
            c.product.name.toLowerCase().includes(query.toLowerCase())
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
                    placeholder="Recherche par produit ..."  
                    value={query}
                    onChange={(event) => updateQuery(event.target.value)}
                  />
                </Col>
           </Form.Group>
         
           <Table>
                    <thead>
                        <tr>
                            <th>Commentaire</th>
                            <th>Date</th>
                            <th>Produit</th>
                            <th>Cote</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showingReviews.map((item,key) => (
                            <tr key={key}>
                                <td>{item.comment}</td>
                                <td>{item.date_reviews}</td>
                                <td><ProductReviews product={item.product}/></td>
                                <td>{item.rating}</td>
                                <td>
                                <Link
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteReviewHandler(item.id)}
                                    >
                                    <i className='fas fa-trash'></i>
                                </Link>
                               
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </div>
    )
}

SearchUserReviews.propTypes = {
    reviews: PropTypes.array.isRequired,
}

export default SearchUserReviews;
