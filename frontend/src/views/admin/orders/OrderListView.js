
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../../actions/orderAction'
import Loader from '../../../composants/Loader'
import Message from '../../../composants/Message'
import  SearchOrder  from '../../../composants/SearchOrder'
import DashboardHeader from '../../../composants/DashboardHeader' 


const OrderListView = ({history}) => {
  
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  
  useEffect(() => {
       
        if(userInfo) { 
            
            dispatch(listOrders())
        } else {
            history.push('/')
        }
  }, [dispatch, history, userInfo])

  return (
      <>
       <DashboardHeader role={userInfo.role}/>
      { loading ? (<Loader />) : error ? (
            <Message></Message>
        ) : (
          <SearchOrder orders={orders}/>
        )}
      </>
    )
}

export default OrderListView