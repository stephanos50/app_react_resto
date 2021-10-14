import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { reviewListByUser, deleteReview} from '../actions/reviewActions'
import { Link } from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'

import ProductReviews from '../composants/ProductReviews'
import { ADMIN_DELETEREVIEW_RESET } from '../constants/reviewContstants'
import { toast } from 'react-toastify'

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
            <h1>Commentaire de <strong className="text-capitalize"></strong></h1>
             <Link to='/admin/reviewsuserlist' className='m-3'> <Button> Retour </Button></Link>
             <Table>
                    <thead>
                        <tr>
                            <th>Commentaire</th>
                            <th>Date</th>
                            <th>Produit</th>
                            <th>Cote</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((item,key) => (
                            <tr key={key}>
                                <td>{item.comment}</td>
                                <td>{item.date_reviews}</td>
                                <td><ProductReviews product={item.product}/></td>
                                <td>{item.rating}</td>
                                <td>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteReviewHandler(item.id)}
                                    >
                                    <i className='fas fa-trash'></i>
                                </Button>
                               
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </div>
    )
}



export default UserReview
