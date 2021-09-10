
import React, {useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Button,Col,Table,Form, FloatingLabel } from 'react-bootstrap'
import {createCategory, deleteCategory, listCategory} from '../actions/categoryAction'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'


const CategoryListScreem = ({history}) => {
    const dispatch = useDispatch()

    const [validated, setValidated] = useState(false)
    const [category, setCategory] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const categoryList = useSelector((state) => state.categoryList)
    const { loading, error, categories } = categoryList

    const categoryDelete = useSelector((state) => state.categoryDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

    useEffect(() => {
        dispatch({type: CATEGORY_CREATE_RESET})
        if(!userInfo && !userInfo.isAdmin){
            history.push('/login')
        }
        dispatch(listCategory())
    }, [dispatch,history,userInfo,successDelete])

    const deleteCategoryHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteCategory(id))
        }
    };
   
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        dispatch(createCategory(category))       
      };
    
    
     
    
    return (
        <>
        <Row className='align-items-center'>
            <Col>
                <h1>Categories</h1>
            </Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Create new allergen"
                            className="mb-3"
                        >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Create new allergen"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                        </FloatingLabel>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    </Row>
             </Form>
            
                    
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
