
import React, {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Button, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import { deleteCategory, listCategory} from '../../../actions/categoryAction'
import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import { CATEGORY_DELETE_RESET } from '../../../constants/categoryConstants'
import DashboardHeader from '../../../composants/DashboardHeader' 
import SearchCategory from '../../../composants/SearchCategory'


const CategoryListScreem = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const categoryList = useSelector((state) => state.categoryList)
    const { loading, error, categories } = categoryList

    const categoryCreate = useSelector((state) => state.categoryCreate)
    const { loading: loadingCreate, error:errorCreate, success:successCreate} = categoryCreate

   const categoryDelete = useSelector((state) => state.categoryDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

    useEffect(() => {
        if(!userInfo && !userInfo.isAdmin){
            history.push('/login')
        }
        dispatch(listCategory())
        if(successDelete) {
            dispatch({type:CATEGORY_DELETE_RESET})
            toast.success('La catégorie a été supprimé')
        }
        if(errorDelete){
            dispatch({type:CATEGORY_DELETE_RESET})
            toast.error('La catégorie contient des produits')
        }
    }, [dispatch,history,userInfo,successDelete,successCreate,errorDelete])

    const deleteCategoryHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteCategory(id))
        }
    };
   
    return (
        
        <>
         <DashboardHeader role={userInfo.role}/>
        <Row>
            {loadingCreate ? (
                <Loader />
            ) : errorCreate ? (
                <Message>{errorCreate}</Message>
            ) :( 
                <Message>{successCreate}</Message>
            ) 
        }
        </Row>
       
      
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='dander'>{errorDelete}</Message>}

        {loading ? (
        <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
           <SearchCategory 
                categories={categories}
                deleteCategoryHandler={deleteCategoryHandler}
            />
        )}
          <Row className='align-items-center'>
           
           <Col className='text-right'>
               <LinkContainer to={`/admin/categorycreate`}>
                   <Button className='my-3'>
                       <i className='fas fa-plus'></i> Ajouter une categorie
                   </Button>
               </LinkContainer>
           </Col>
       </Row>

           
    
            
        </>
    )
}

export default CategoryListScreem
