
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderAction'
import Loader from '../composants/Loader'
import Message from '../composants/Message'
import  SearchOrder  from '../composants/SearchOrder'


const OrderListView = ({history}) => {
  
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
     
        if(userInfo){ 
            const admin = userInfo.roles.find(element => element.name === 'admin');
            const livreur = userInfo.roles.find(element => element.name === 'livreur');
            
            if(admin || livreur ){
                dispatch(listOrders())
            }
           
        } else {
            history.push('/')
        }
  }, [dispatch, history, userInfo])

  return (
      <>
      <h1>Orders</h1>
      { loading ? (<Loader />) : error ? (
            <Message></Message>
        ) : (
          <SearchOrder orders={orders}/>
        )}
      </>
    )
}

export default OrderListView
