
import React, {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Button, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'

import { deleteCategory, listCategory} from '../../../actions/categoryAction'
import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import { CATEGORY_DELETE_RESET } from '../../../constants/categoryConstants'
import DashboardHeader from '../../../composants/DashboardHeader' 
import SearchCategory from '../../../composants/SearchCategory'


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

    const { requestSort, sortConfig } = useSortableData(categories);
    
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

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
        <Row>
            <Col md={2}> <DashboardHeader role={userInfo.role}/></Col>
            <Col>
            {loadingCreate ? (
                <Loader />
            ) : errorCreate ? (
                <Message>{errorCreate}</Message>
            ) :( 
                <Message>{successCreate}</Message>
            ) 
            }
          
        
       
      
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
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
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

           
    
       </Col>
       </Row>
        </>
    )
}

export default CategoryListScreem
