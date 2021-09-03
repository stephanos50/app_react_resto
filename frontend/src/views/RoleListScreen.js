import React, {useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Button,Col,Table, Form } from 'react-bootstrap'
import { deleteRole, listRoles, createRole} from '../actions/roleActions'
import Message from '../composants/Message'
import Loader from '../composants/Loader'

import { LinkContainer } from 'react-router-bootstrap'

const RoleListScreen =({history}) => {
    const dispatch = useDispatch()

    const [validated, setValidated] = useState(false)
    const [role, setRole] = useState('')


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const rolesList = useSelector((state) => state.rolesList)
    const { loading, error, roles } = rolesList

    const roleCreate = useSelector((state) => state.roleCreate)
    const { loading: loadingRole, esuccess: successRole, error: errorRole} = roleCreate

    const roleDelete = useSelector((state) => state.roleDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete } = roleDelete
    

    useEffect(() => {
        if(!userInfo && !userInfo.isAdmin){
            history.push('/login')
        }
        dispatch(listRoles())
       
    }, [dispatch,history,userInfo,successDelete, successRole ])

    const deleteRoleHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteRole(id))
        }
      }

    const handleSubmit = () => {
        dispatch(createRole(role))
        history.push('/admin/rolelist')
    };
    return (
        <>
        <Row className='align-items-center'>
            <Col>
                <h1>Roles</h1>
            </Col>
            <Col className='text-right'>
                <LinkContainer to={`/admin/rolecreate`}>
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i> Create Role
                    </Button>
                </LinkContainer>
            </Col>
            
                    
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingRole && <Loader />}
        {errorRole && <Message variant='danger'>{errorRole}</Message>}


       

        {loading ? (
        <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {roles.map((role) => (
                
                <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>
                    
                    <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteRoleHandler(role.id)}
                    >
                        <i className='fas fa-trash'></i>
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
                
            </Table>
        )}
      
        <Form onSubmit={handleSubmit}>
               <Form.Label>Create New Allergen</Form.Label>
               <Form.Control 
                    type="text"
                    placeholder="create new category"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
               ></Form.Control>
               <br></br>
                <Button type='submit' variant='primary'>Create</Button>
           </Form>
    
    </>)
  
}



export default RoleListScreen

