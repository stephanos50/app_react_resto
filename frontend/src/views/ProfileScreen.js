import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import {deleteViewOrder } from '../actions/orderAction'

import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { toast } from 'react-toastify'
import {ORDER_VIEW_RESET } from '../constants/orderConstants'




const ProfileScreem = ({history}) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [messageUpdate, setmessageUpdate] = useState(null)
    const [messageCommande, setMessageCommande] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { error:errorUpdate, success } = userUpdateProfile

    const viewOrderDelete = useSelector((state) => state.viewOrderDelete)

    const {success: successDelete} =viewOrderDelete
    
    
    
    useEffect(() => {
      
        if(!userInfo){
            history.push('/login')
        } else{
            
            if( !user || !user.first_name || success  ){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
               
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
            }
            if(!user.orders){
                setMessageCommande('Aucune commande')
            }
            if(successDelete){
                
                dispatch({type:ORDER_VIEW_RESET})
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
               
                toast.success('Votre commande a été supprimé')
                
               
            }
        }
    }, [dispatch, history, userInfo, user, success, successDelete])

    const submitHandler = (e) => { 
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Votre mot de passe ne correspond pas')
            setmessageUpdate(null)
        }else {
            setMessage('')
            setmessageUpdate('Profile mit à jour')
            dispatch(updateUserProfile({ email, first_name, last_name,  password}))
           
        }
      
    }

    const deleteHandler = (id) => {
      
        if (window.confirm('Are you sure')) {
            dispatch(deleteViewOrder(id))
           
        }
    }
    
    return ( 
        <Row>
            <Col md={3}>
                <h2>Votre profil</h2>
                {message && <Message variant="danger">{message}</Message>}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                { !user.orders ? <Message variant='danger'>{messageCommande}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Numéro</th>
                                <th>Heure</th>
                                <th>Date</th>
                                <th>Total</th>
                                
                                <th>Livrée</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.orders.map(order => 
                                !order.delete && (    <tr key={order.id}>
                                    <td>{order.number}</td>
                                    <td>{order.time}</td>
                                    <td>{order.date_createAt.split(',')[0]}</td>
                                    <td>{order.total} €</td>
                                    <td>{order.isDelivered ?  ( <i className='' style={{color:'#B52036'}}>Livrée</i>) : ( <i className='' style={{color:'#B52036'}}>Not Delivered</i>) }</td>
                                    <td>
                                        <LinkContainer to={`/order/${order.id}`}>
                                            <Button variant='light' className='btn-sm'> 
                                                <i className='fas fa-eye'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={(e) => deleteHandler(order.id)}
                                            >
                                            <i className='fas fa-trash'></i>
                                            </Button>
                                    </td>
                                </tr>) 
                            
                            )}
                        </tbody>
                    </Table>
                )}
                <Link to='/' className='m-3'> <Button> Retour </Button></Link>
            </Col>
        </Row>
        )
    }

export default ProfileScreem;