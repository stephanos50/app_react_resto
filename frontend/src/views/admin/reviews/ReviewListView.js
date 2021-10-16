import React ,{ useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { usersList} from '../../../actions/reviewActions'
import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import DashboardHeader from '../../../composants/DashboardHeader' 
import SearchReview from '../../../composants/SearchReview'



const ReviewListView = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listusers = useSelector((state) => state.listusers)
    const {loading, error, users }  = listusers
   
 
   
    
    useEffect(() => {
        if(!userInfo || userInfo.role !== "admin"){
            history.push('/login')
        } 
        dispatch(usersList())
       
    }, [dispatch,history,userInfo])

  
    return (
        <>
         <DashboardHeader role={userInfo.role}/>
       
        {loading ? (
            <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : ( 
               <SearchReview users={users}/>
            )}
        </>
    )
}

export default ReviewListView



