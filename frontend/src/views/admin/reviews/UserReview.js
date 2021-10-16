import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { reviewListByUser, deleteReview} from '../../../actions/reviewActions'

import { ADMIN_DELETEREVIEW_RESET } from '../../../constants/reviewContstants'
import { toast } from 'react-toastify'

import DashboardHeader from '../../../composants/DashboardHeader' 
import SearchUserReviews from '../../../composants/SearchUserReviews'

const UserReview = ({match, history}) => {
    const id = match.params.id;
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listreview = useSelector((state) => state.listreview)
    const {loading, error, reviews} = listreview
   
    const reviewsDelete = useSelector((state) => state.reviewsDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = reviewsDelete

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
            <DashboardHeader role={userInfo.role}/>
          
            <SearchUserReviews reviews={reviews} deleteReviewHandler={deleteReviewHandler}/>
        </div>
    )
}



export default UserReview
