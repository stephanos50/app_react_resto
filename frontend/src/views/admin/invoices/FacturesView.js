import React ,{ useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Table } from 'react-bootstrap'

import { facturesList} from '../../../actions/facturesActions'
import Invoice from '../../../composants/Invoice'
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
  

const FacturesView = ({history}) => {

    const dispatch = useDispatch()

    const [state, setstate] = useState(0)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList
    
    const { requestSort, sortConfig } = useSortableData(orders);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
        return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    
    useEffect(() => {
        if(!userInfo || userInfo.role !== "admin"){
            history.push('/login')
        } 
        dispatch(facturesList())
       
   
    }, [dispatch,history,userInfo,state])

  
    return (
        <>
        <Row>
            {loading}
            {error}
            <Col md={2}><DashboardHeader role={userInfo.role}/></Col>
            
            <Col> <Invoice 
                    orders= {orders} 
                    setstate={setstate} 
                    state={state}
                    requestSort={requestSort}
                    getClassNamesFor={getClassNamesFor}
                    /></Col>
           
        </Row>
       
       
        
       
        </>
       
    )
}

export default FacturesView
