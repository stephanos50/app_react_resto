import {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'



const ProfileScreem = ({ location, history}) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [messageUpdate, setmessageUpdate] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { error:errorUpdate, success } = userUpdateProfile

   
    useEffect(() => {
      
        if(!userInfo){
            history.push('/login')
        } else{
            console.log(Object.keys(userInfo.orders).length === 0)
            if( !user || !user.first_name || success ){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => { 
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Votre mot de passe ne correspond pas')
            setmessageUpdate(null)
        }else {
            setMessage('')
            setmessageUpdate('Profile mit à jour')
            dispatch(updateUserProfile({id: email, first_name, last_name,  password}))
           
        }
    }
    
    return ( 
        <Row>
            <Col md={3}>
                <h2>Votre profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {}
                {messageUpdate && <Message variant='success'>{messageUpdate}</Message>}
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
                                value={email}
                                readOnly
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
                { (Object.keys(userInfo.orders).length === 0) ? <Message variant='danger'>{}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Numéro</th>
                                <th>Heure</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Délivrer</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.date_number}</td>
                                    <td>{order.date_time}</td>
                                    <td>{order.date_createAt}</td>
                                    <td>{order.total} €</td>
                                    <td>{order.isDelivered ? order.isDeliveredAt : ( <i className='' style={{color:'#B52036'}}>Not Delivered</i>)}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm' variant='primary'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
        )
    }

export default ProfileScreem;