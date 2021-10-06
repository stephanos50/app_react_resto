import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import FormContainer from '../composants/FormContainer'
import { getUserDetails , updateUser} from '../actions/adminActions'
import { Form, Button} from 'react-bootstrap'
import { USER_UPDATE_RESET } from '../constants/adminConstants'
import { roles } from '../utilis/roles'
import {toast} from 'react-toastify'





const UserEditScreem = ({match, history}) => {
    
    const userId = match.params.email
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [role, setRole] = useState('')
    let [handle, handleOnChange] = useState('')
    const [checkedState, setCheckedState] = useState(
        new Array(roles.length).fill(false)
    );
    
    
    const dispatch = useDispatch()

    const userAdminDetails = useSelector((state) => state.userAdminDetails)
    const { loading, error, user } = userAdminDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

   
   
    useEffect(()=> {
            // If success update you resest the update state  and redirect to userList
            if(successUpdate){
                dispatch({type: USER_UPDATE_RESET})
                toast.success(`Role de ${user.first_name} modifié`)
                history.push('/admin/userlist')
            }else{
                if(!user||!user.roles ||  !user.first_name || user.email !== userId  ){
                    dispatch(getUserDetails(userId))
                }else {
                    setEmail(user.email)
                    setFirstName(user.first_name)
                    setLastName(user.last_name)
                    const role = user.roles.map((role) => {
                        handleOnChange(role.id -1)
                    })
                   
                }
            }
       
    }, [dispatch,userId,user, successUpdate,history,handle])

    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(updateUser({email:userId,first_name, last_name, role}))
        
    }

     handleOnChange = (position) => {
        
        const updatedCheckedState = checkedState.map((item, index) => {
            if (index === position ) {
                return !item;
            } else if (index !== position && item === true) {
                return !item;
            } else {
                return item
            }
          });
        setCheckedState(updatedCheckedState);
        setRole(position+1)
       
    }
    

    return ( 
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
            
            <h1>Modifier l'utilisateur</h1>
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
                    <fieldset>
                    <Form.Group>
                        { roles.map((role) => 
                            <Form.Check key={role.id}
                                inline
                                type="checkbox"
                                label={role.name}
                                name={role.name}
                                value={role.id}
                                checked={checkedState[role.id-1]}
                                onChange={() => handleOnChange(role.id-1)}
                              
                            />
                        )}
                    </Form.Group>
                    </fieldset>
                    <Button type='submit' variant='primary'>Update</Button>
            </Form>
            )}
        </FormContainer>
        </>
    )
    
        
}

export default UserEditScreem;