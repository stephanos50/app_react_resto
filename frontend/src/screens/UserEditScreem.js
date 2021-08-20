import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import FormContainer from '../composants/FormContainer'
import { getUserDetails , updateUser} from '../actions/adminActions'
import { Form, Button} from 'react-bootstrap'
import { USER_UPDATE_RESET } from '../constants/adminConstants'



const UserEditScreem = ({match, history}) => {
    
    const userId = match.params.email
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [isAdmin, setIsAdmin] = useState('')
    
    const dispatch = useDispatch()

    const userAdminDetails = useSelector((state) => state.userAdminDetails)
    const { loading, error, user } = userAdminDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

   
    useEffect(()=> {
            // If success update you resest the update state  and redirect to userList
            if(successUpdate){
                dispatch({type: USER_UPDATE_RESET})
                history.push('/admin/userlist')
            }else{
                if(!user.first_name || user.email !== userId  ){
                    dispatch(getUserDetails(userId))
                }else {
                    setEmail(user.email)
                    setFirstName(user.first_name)
                    setLastName(user.last_name)
                    setIsAdmin(user.isAdmin)
                }
            }
       
    }, [dispatch,userId,user, successUpdate,history])

    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(updateUser({email:userId, email,first_name, last_name, isAdmin}))
        
    }
    return ( 
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
            
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />} 
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Form onSubmit={submitHandler}>

                    <Form.Group className="mb-3" controlId='email'>
                        <Form.Label>Votre email</Form.Label>
                        <Form.Control 
                            type='email'
                            placeholder='Entrez votre email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='first_name'>
                        <Form.Label>Votre prénom</Form.Label>
                        <Form.Control 
                            type='first_name'
                            placeholder='Entrer votre prénom' 
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='last_name'>
                        <Form.Label>Votre nom</Form.Label>
                        <Form.Control 
                            type='last_name'
                            placeholder='Entrer votre nom' 
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='isAdmin'>
                        <Form.Check 
                            type='checkbox'
                            label='isAdmin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
                    
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
            </Form>
            )}
        </FormContainer>
        </>
    )
    
        
}

export default UserEditScreem;