
import React, { useState,useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { deleteUser } from '../../../actions/adminActions'
import SearchUser from '../../../composants/SearchUser'
import { USER_DELETE_RESET} from '../../../constants/adminConstants'

import { toast } from 'react-toastify'
import DashboardHeader from '../../../composants/DashboardHeader' 




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
        dispatch({type: USER_DELETE_RESET})
        toast.success("L'utilisateur a bien été supprimé")
      }
      
  }


    return (
      <>
       <DashboardHeader role={userInfo.role}/>
      <SearchUser 
        users={users}
        deleteHandler={deleteHandler}
      />
    </>

        
    )
}

export default UserListScreem