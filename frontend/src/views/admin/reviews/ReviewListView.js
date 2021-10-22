import React ,{ useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import { usersList} from '../../../actions/reviewActions'
import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import DashboardHeader from '../../../composants/DashboardHeader' 
import SearchReview from '../../../composants/SearchReview'



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
  


const ReviewListView = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listusers = useSelector((state) => state.listusers)
    const {loading, error, users }  = listusers

    const { requestSort, sortConfig } = useSortableData(users);
    
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
        dispatch(usersList())
       
    }, [dispatch,history,userInfo])

  
    return (
        <>
        <Row>
            <Col md={2}> <DashboardHeader role={userInfo.role}/></Col>
            <Col>
            {loading ? (
            <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : ( 
               <SearchReview 
                users={users}
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
                
            />
            )}
            </Col>
        </Row>
        
       
       
        </>
    )
}

export default ReviewListView



