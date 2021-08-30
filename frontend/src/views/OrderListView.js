
import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderAction'
import Loader from '../composants/Loader'
import Message from '../composants/Message'



const OrderListView = ({history}) => {

  const dispatch = useDispatch()

const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
   


  useEffect(() => {
        if(userInfo && userInfo.isAdmin){ 
            dispatch(listOrders())
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
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.number}</td>
                  <td>{order.user.first_name}</td>
                  <td>{order.createAt}</td>
                  <td>{order.total} €</td>
                  
                
                  <td>
                  {order.isPaid ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.Delivered ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                  
                  
                  <td>
                    <LinkContainer to={`/order/${order.id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
       
    
    </>

        
    )
}

export default OrderListView
