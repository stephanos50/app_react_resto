
import React, {useState} from 'react'
import  PropTypes from 'prop-types'
import { Button, Table, Form, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

 const SearchUser = (props) => {
    const [query, setQuery] = useState('')
    const { users } = props


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
              
              <th><a
                        type="button"
                        style={{color: "#AF1025"}}
                        onClick={() => props.requestSort('first_name')}
                        className={props.getClassNamesFor('first_name')}
                      >
                      Nom
                      </a>
              </th>
              <th>Courriel</th>
              <th>Administrateur</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {showingUsers.map((user) => (
              <tr key={user._uuid}>
                
                <td>{user.first_name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.roles[0].name === 'admin' ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/${user.id}/edit`}>
                    <Button variant='primary' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(`${user.id}`)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
    )
}

SearchUser.propTypes = {
    users: PropTypes.array.isRequired,
}

export default SearchUser;
