import React, { useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import SearchProduct from '../../../composants/SearchProduct'
import { listProducts, deleteProduct, createProduct } from '../../../actions/productAction'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../../constants/productConstants'
import {toast} from 'react-toastify'
import DashboardHeader from '../../../composants/DashboardHeader' 



const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
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

const ProductListScreen = ({ history }) => {

 
  const dispatch = useDispatch()
 
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { items, requestSort, sortConfig } = useSortableData(products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})
    if (!userInfo || !userInfo.role === 'admin') {
      history.push('/login')
    } 
    if(successCreate) {
      history.push(`/admin/product/${createdProduct.id}/edit`)
      
    } else {
      dispatch(listProducts())
    } 
    if(successDelete){
      dispatch({type:PRODUCT_DELETE_RESET})
      toast.error('Le produit a été suprimé')
    }
    
  },[dispatch, history, userInfo, successDelete , successCreate, createdProduct])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
      
    }
  }

  const createProductHandler = () => {
      dispatch(createProduct())
      
  }

  return (
    <>
    <Row>
      <Col md={2}>
         <DashboardHeader role={userInfo.role}/>
      </Col>
   
     
   
      
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='dander'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='dander'>{errorCreate}</Message>}
     
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col>
        <SearchProduct 
          products={items}
          deleteHandler={deleteHandler}
          requestSort={requestSort}
          getClassNamesFor={getClassNamesFor}
        />

        <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
        </Button>
        </Col>
      )}
    
       

          </Row> 
    </>
    
  )
}

export default ProductListScreen
