import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import { login } from '../actions/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../composants/FormContainer'

const LoginScreem = ({location, history}) => {

    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo  } = userLogin
    

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=> {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
         
        } else {
            event.preventDefault()
            dispatch(login(email, password))
        }
        
        
      };
  

   

    return ( 
        <FormContainer>
                <h1>Connectez-vous</h1>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />} 
                <Form noValidate validated={validated}  onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId='validationEmail'>
                        <Form.Label>Votre email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder='Entrez votre email' 
                            value={email}
                            
                            onChange={(e) =>  
                                {
                                    if(e.target.value.match("^[a-zA-Z@.]*$") != null){
                                        setEmail(e.target.value)
                                    }
                                }
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            Données incorrectes
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='validationPassword'>
                        <Form.Label>Votre mot de passe</Form.Label>
                        <Form.Control 
                            required
                            type='password'
                            placeholder='Entrez votre mot de passe ' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                                Champ obligatoire 
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Valider</Button>
                </Form>

                <Row className='py-3'>
                    <Col> Nouveau client ?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}> 
                            Inscrivez-vous
                        </Link> 
                    </Col>
                </Row>
        </FormContainer>

       

    )
    
        
}

export default LoginScreem;