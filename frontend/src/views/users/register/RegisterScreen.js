import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'

import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import FormContainer from '../../../composants/FormContainer'
import { register } from '../../../actions/userActions'




const RegisterScreem = ({location, history}) => {

    const [validated, setValidated] = useState(false);

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)

    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=> {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false ) {
          event.preventDefault();
          event.stopPropagation();
          setValidated(true);
        } else {
            submitHandler(event)
        }
        
      };

    const submitHandler = (e) => { 
        e.preventDefault()
        if(password !== confirmPassword){
            e.stopPropagation();
            setValidated(true);
            setMessage('Votre mot de passe ne correspond pas')
        }else {
            dispatch(register(first_name,last_name,email, password))
        }
    }
    return ( 
        <FormContainer>
            
                <h1>Nouvelle inscription</h1>
                
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />} 
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId='first_name'>
                        <Form.Control 
                            required
                            type='first_name'
                            placeholder='Insérer votre prénom longueur max 20 caractères min 4' 
                            value={first_name}
                            onChange={(e) =>  
                                {
                                    if(e.target.value.match("^[a-zA-Z éè'ç]*$") != null){
                                        setFirstName(e.target.value)
                                    }
                                }
                            }
                        />
                         <Form.Control.Feedback type='invalid'>Données incorrectes</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='last_name'>
                        <Form.Control 
                            required
                            type='last_name'
                            placeholder='Insérer votre nom longueur max 20 caractères min 4' 
                            value={last_name}
                            onChange={(e) =>  
                                {
                                    if(e.target.value.match("^[a-zA-Z éè'ç]*$") != null){
                                        setLastName(e.target.value)
                                    }
                                }
                            }
                           
                        />
                         <Form.Control.Feedback type='invalid'>Données incorrectes</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='email'>
                        <Form.Control 
                            required
                            type='email'
                            placeholder='Insérer votre email' 
                            value={email}
                            onChange={(e) =>  
                                {
                                    if(e.target.value.match("^[a-zA-Z@.]*$") != null){
                                        setEmail(e.target.value)
                                    }
                                }
                            }
                           
                        />
                        <Form.Control.Feedback type='invalid'>Données incorrectes</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='password'>
                        <Form.Control 
                            required
                            type='password'
                            placeholder='Mot de passe supérieur à 8 ' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid' >Longeur du mot de passe </Form.Control.Feedback>
                        <Form.Control.Feedback >{message && <Message variant="danger">{message}</Message>}</Form.Control.Feedback>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId='confirmPassword'>
                        <Form.Control 
                            required
                            type='password'
                            placeholder='Confirmez votre mot de passe ' 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid' >Longeur du mot de passe </Form.Control.Feedback>
                    </Form.Group>


                    <Button type='submit' variant='primary'>Inscrivez-vous</Button>
                    <Link to='/' className='m-3'> <Button> Retour </Button></Link>                         

                </Form>

                <Row className='py-3'>
                    <Col> Déja client ?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}> 
                            Se connecter
                        </Link> 
                    </Col>
                </Row>
        </FormContainer>

       

    )
    
        
}

export default RegisterScreem;