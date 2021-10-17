
import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import {Table, Form, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

 const SearchCategory = (props) => {

    const [query, setQuery] = useState('')
    
    const { categories } = props
    const { deleteCategoryHandler} = props

    const showingCategories = query === ''
        ? categories
        : categories.filter((c) => (
            c.name.toLowerCase().includes(query.toLowerCase())
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
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                {showingCategories.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                    
                        <Link
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteCategoryHandler(item.id)}
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

SearchCategory.propTypes = {
    categories: PropTypes.array.isRequired,
}

export default SearchCategory;
