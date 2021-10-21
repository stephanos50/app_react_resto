import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import { Row, Col } from 'react-bootstrap'

import { reviewListByUser, deleteReview} from '../../../actions/reviewActions'
import { ADMIN_DELETEREVIEW_RESET } from '../../../constants/reviewContstants'
import DashboardHeader from '../../../composants/DashboardHeader' 
import SearchUserReviews from '../../../composants/SearchUserReviews'

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
  


const UserReview = ({match, history}) => {
    const id = match.params.id;
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listreview = useSelector((state) => state.listreview)
    const {loading, error, reviews} = listreview
   
    const reviewsDelete = useSelector((state) => state.reviewsDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = reviewsDelete

    const { items, requestSort, sortConfig } = useSortableData(reviews);
    console.log(items)
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    useEffect(() => {
        if(!userInfo && !userInfo.role === "admin"){
            history.push('/login')
        }
        dispatch(reviewListByUser(id))
        if(successDelete){
            dispatch({type: ADMIN_DELETEREVIEW_RESET})
            toast.success('Commentaire supprimé')
        }
        
    }, [dispatch,history,match,userInfo,successDelete,id])

    const deleteReviewHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteReview(id))
        }
    };




    return (
        <div>
            <Row>
                <Col md={2}> <DashboardHeader role={userInfo.role}/></Col>
                <Col>  <SearchUserReviews 
                            reviews={reviews} 
                            deleteReviewHandler={deleteReviewHandler}
                            requestSort={requestSort}
                            getClassNamesFor={getClassNamesFor}
                        />
                </Col>
            </Row>
           
          
          
        </div>
    )
}



export default UserReview
