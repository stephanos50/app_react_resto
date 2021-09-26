
import React, {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Button,Col,Table } from 'react-bootstrap'
import { deleteCategory, listCategory} from '../actions/categoryAction'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'
import { LinkContainer } from 'react-router-bootstrap'



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
        dispatch({type: CATEGORY_CREATE_RESET})
        if(!userInfo && !userInfo.isAdmin){
            history.push('/login')
        }
        dispatch(listCategory())
    }, [dispatch,history,userInfo,successDelete,successCreate])

    const deleteCategoryHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteCategory(id))
        }
    };
   
    return (
        <>
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
        <Row>
            
        </Row>
        <Row className='align-items-center'>
            <Col>
                <h1>Categories</h1>
            </Col>
            <Col className='text-right'>
                <LinkContainer to={`/admin/categorycreate`}>
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i> Ajouter une categorie
                    </Button>
                </LinkContainer>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='dander'>{errorDelete}</Message>}

        {loading ? (
        <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                    
                    <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteCategoryHandler(category.id)}
                    >
                        <i className='fas fa-trash'></i>
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
                
            </Table>
        )}

           
    
            
        </>
    )
}

export default CategoryListScreem
