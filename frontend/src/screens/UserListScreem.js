
import React, { useState,useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { deleteUser } from '../actions/adminActions'




const UserListScreem = ({history}) => {

  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
        if(userInfo && userInfo.isAdmin){ 
            const config = {
              headers: {
                  Authorization: `Bearer ${userInfo.token}`,
              },
            }
            const fetchListUsers = async () => {
              const { data } = await axios.get(`/api/admin`, config)
              setUsers(data)
            }
            fetchListUsers()
        } else {
            history.push('/')
        }
    
  }, [history, successDelete, userInfo])

  const deleteHandler = (email) => {
      if(window.confirm('Are you sure')){
        dispatch(deleteUser(email))
      }
      
  }
  

    return (
      <>
      <h1>Users</h1>
     
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._uuid}>
                <td>{user._uuid}</td>
                <td>{user.first_name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/${user.email}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(`${user.email}`)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    
    </>

        
    )
}

export default UserListScreem
