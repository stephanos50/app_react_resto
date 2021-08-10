import {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'



const ProfileScreem = ({ location, history}) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    // const { success } = userUpdateProfile
   
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else{
            if( !user || !user.first_name ){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                
            } else {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => { 
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Votre mot de passe ne correspond pas')
            setSuccess(null)
        }else {
            setMessage('')
            setSuccess('Profile mit à jour')
            dispatch(updateUserProfile({id: email, first_name, last_name,  password}))
        }
    }
    return ( 
        <Row>
            <Col md={3}>
                <h2>Votre profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {}
                {success && <Message variant='success'>{success}</Message>}
                {loading ? ( 
                    <Loader />
                ) : error ? ( 
                    <Message variant="danger">{error}</Message>
                ) : ( 
                    <Form onSubmit={submitHandler}>
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

                        <Form.Group className="mb-3" controlId='email'>
                            <Form.Label>Votre email</Form.Label>
                            <Form.Control 
                                type='email'
                                placeholder='Entrez votre email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='password'>
                            <Form.Label>Votre mot de passe</Form.Label>
                            <Form.Control 
                                type='password'
                                placeholder='Entrez votre mot de passe ' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='confirmPassword'>
                            <Form.Label>Confirmez votre mot de passe</Form.Label>
                            <Form.Control 
                                type='password'
                                placeholder='Confirmez votre mot de passe ' 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Mettre à jour</Button>
                    </Form>
                )} 
            </Col>
            <Col md={9}>
                <h2>Mes commandes</h2>
            </Col>
        </Row>
        )
    }

export default ProfileScreem;