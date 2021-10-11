
import React, { useState,useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { deleteUser } from '../actions/adminActions'
import SearchUser from '../composants/SearchUser'




const UserListScreem = ({history}) => {

  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete
  
  useEffect(() => {
        if(userInfo){ 
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
      <SearchUser 
        users={users}
        deleteHandler={deleteHandler}
      />
    </>

        
    )
}

export default UserListScreem;