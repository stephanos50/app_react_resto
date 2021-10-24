
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import { listOrders } from '../../../actions/orderAction'
import Loader from '../../../composants/Loader'
import Message from '../../../composants/Message'
import  SearchOrder  from '../../../composants/SearchOrder'
import DashboardHeader from '../../../composants/DashboardHeader' 
import {deleteViewOrder } from '../../../actions/orderAction'
import {ORDER_VIEW_RESET } from '../../../constants/orderConstants'
import { toast } from 'react-toastify'




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




const OrderListView = ({history}) => {
  
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const viewOrderDelete = useSelector((state) => state.viewOrderDelete)

  const {success: successDelete} =viewOrderDelete

  const { requestSort, sortConfig } = useSortableData(orders);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  
  
  useEffect(() => {
       
        if(userInfo) { 
            
            dispatch(listOrders())
        } else {
            history.push('/')
        }

        if(successDelete){
                
          dispatch({type:ORDER_VIEW_RESET})
         
          dispatch(listOrders())
         
          toast.success('Votre commande a été supprimé')
          
         
      }
  }, [dispatch, history, userInfo,successDelete])

  const deleteHandler = (id) => {
      
    if (window.confirm('Are you sure')) {
        dispatch(deleteViewOrder(id))
       
       
    }
  }
  

  return (
      <>
      <Row>
        <Col md={2}>
        <DashboardHeader role={userInfo.role}/>

        </Col>
        <Col>
        { loading ? (<Loader />) : error ? (
            <Message></Message>
        ) : (
          <SearchOrder 
            orders={orders}
            requestSort={requestSort}
            getClassNamesFor={getClassNamesFor}
            deleteHandler={deleteHandler}
          
          />
        )}
        </Col>
      </Row>
      
    
      </>
    )
}

export default OrderListView
