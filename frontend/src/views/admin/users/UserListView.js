
import React, { useState,useEffect } from 'react'
import {Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { deleteUser } from '../../../actions/adminActions'
import SearchUser from '../../../composants/SearchUser'
import { USER_DELETE_RESET} from '../../../constants/adminConstants'

import { toast } from 'react-toastify'
import DashboardHeader from '../../../composants/DashboardHeader' 



const useSortableData = (items, config = null) => {
  
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = items;
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};




const UserListScreem = ({history}) => {

  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const { requestSort, sortConfig } = useSortableData(users);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  
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
      <Row>
        <Col md={2}>
          <DashboardHeader role={userInfo.role}/>
        </Col>
        <Col>
          <SearchUser 
          users={users}
          deleteHandler={deleteHandler}
          requestSort={requestSort}
          getClassNamesFor={getClassNamesFor}
        />
        </Col>
      </Row>
       
     
    </>

        
    )
}

export default UserListScreem
