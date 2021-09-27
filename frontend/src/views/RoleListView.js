import React, {useEffect, useState }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Button,Col,Table } from 'react-bootstrap'
import { deleteRole, listRoles} from '../actions/roleActions'
import Message from '../composants/Message'
import Loader from '../composants/Loader'

import { LinkContainer } from 'react-router-bootstrap'

const RoleListScreen =({history}) => {

    const dispatch = useDispatch()

    const [messageSuccess, setMessageSuccess] = useState('')
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const rolesList = useSelector((state) => state.rolesList)
    const { loading, error, roles } = rolesList

    const roleCreate = useSelector((state) => state.roleCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate} = roleCreate;

    const roleDelete = useSelector((state) => state.roleDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete } = roleDelete
    

    useEffect(() => {
        
        if(!userInfo && !userInfo.isAdmin){
            history.push('/login')
        }
       dispatch(listRoles())
       if (successCreate) {
            setMessageSuccess('Review submitted successfully')
       } 
      
       
       
    }, [dispatch,history,userInfo,successDelete,successCreate ])

    const deleteRoleHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteRole(id))
            
        }
      }

    return (
        <>
        <Row>
            {loadingCreate ? (
                <Loader />
            ) : errorCreate ? (
                <Message>{errorCreate}</Message>
            ) :( 
                
                <Message variant='success'>
                    {messageSuccess}
              </Message>
            ) 
        }
        </Row>
        <Row>
            {loadingDelete && <Loader />}
            { errorDelete &&  <Message>{errorDelete}</Message>}
          
        </Row>
        <Row className='align-items-center'>
            <Col>
                <h1>Roles</h1>
            </Col>
            <Col className='text-right'>
                <LinkContainer to={`/admin/rolecreate`}>
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i> Ajouté un rôle
                    </Button>
                </LinkContainer>
            </Col>
            
                    
        </Row>
      
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
      
       
    
   </> )
  
}

export default RoleListScreen

