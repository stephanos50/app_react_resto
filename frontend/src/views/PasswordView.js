import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {changePassword} from '../actions/userActions'
import Message from '../composants/Message'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../composants/FormContainer'
import { Link } from 'react-router-dom' 


 

const PasswordLost = () => {

    const dispatch = useDispatch();

    const [validated, setValidated] = useState();
    const [email, setEmail] = useState('')

    const userPasswordChange = useSelector((state) => state.userPasswordChange)
    const { error, success} = userPasswordChange;
    console.log(success)
    useEffect(()=> {
       
    },[dispatch])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
         
        } else {
            event.preventDefault()
            dispatch(changePassword(email))
        }
        
        
      };
    return (
       
      <FormContainer>

       
        
        <Form noValidate validated={validated}  onSubmit={handleSubmit}>
            <h1>Mot de passe oublié</h1>
            <Form.Group className="mb-3" controlId='validationEmail'>
                <Form.Label>Entrez votre email</Form.Label>
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
                            Email incorrecte
                        </Form.Control.Feedback>
                        <br></br>
                        <Button type="submit" variant="primary"> Envoyer </Button>
                            <Link to='/login' className='m-3'>
                                <Button> Retour </Button>
                            </Link>
                </Form.Group>

                {success && ( <Message variant="success">Un email vient de vous être envoyé.</Message> )}
                {error && ( <Message variant="danger">{error}</Message> )}
               

            </Form>
        </FormContainer>
        
    )
}

export default  PasswordLost;
