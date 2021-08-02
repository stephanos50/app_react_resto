import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import { register } from '../actions/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../composants/FormContainer'

const RegisterScreem = ({location, history}) => {

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

    const submitHandler = (e) => { 
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Votre mot de passe ne correspond pas')
        }else {
            dispatch(register(first_name,last_name,email, password))
        }
    }
    return ( 
        <FormContainer>
                <h1>Nouvelle inscription</h1>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />} 
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


                    <Button type='submit' variant='primary'>Inscrivez-vous</Button>
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