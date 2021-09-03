import React, {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Button,Col,Table,Form } from 'react-bootstrap'
import { deleteAllergen, listAllergen, createAllergen} from '../actions/allergenActions'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import { ALLERGEN_CREATE_RESET } from '../constants/allergenConstant'
import { LinkContainer } from 'react-router-bootstrap'

const AllergenListScreen =({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const allergenList = useSelector((state) => state.allergenList)
    const { loading, error, allergens } = allergenList

    const allergenCreate = useSelector((state) => state.allergenCreate)
    const { success} = allergenCreate

   

    const allergenDelete = useSelector((state) => state.allergenDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete } = allergenDelete

    useEffect(() => {
       
        if(!userInfo && !userInfo.isAdmin){
            history.push('/login')
        }
        dispatch(listAllergen())
    }, [dispatch,history,userInfo,successDelete ])

    const deleteAllergenHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteAllergen(id))
        }
      }
    
     
    
    return (
        <>
        <Row className='align-items-center'>
            <Col>
                <h1>Allergen</h1>
            </Col>
            <Col className='text-right'>
                <LinkContainer to={`/admin/allergenCreate`}>
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i> Create Allergen
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
                {allergens.map((allergen) => (
                
                <tr key={allergen.id}>
                    <td>{allergen.id}</td>
                    <td>{allergen.name}</td>
                    <td>
                    
                    <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteAllergenHandler(allergen.id)}
                    >
                        <i className='fas fa-trash'></i>
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
                
            </Table>
        )}
    
    </>)
  
}



export default AllergenListScreen

