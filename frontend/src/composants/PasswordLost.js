import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {changePassword} from '../actions/userActions'
import Message from '../composants/Message'

 

const PasswordLost = () => {

    const dispatch = useDispatch();
    const [validated, setValidated] = useState();
    const [email, setEmail] = useState()

    const userPasswordChange = useSelector((state) => state.userPasswordChange)
    const {loading, error} = userPasswordChange;
    
   

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
      
        <Form noValidate validated={validated}  onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId='validationEmail'>
                <Form.Label>Mot de passe oublié</Form.Label>
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
                        <Button type="submit" variant="primary">Envoyer</Button>
                </Form.Group>

                {loading && ( <Message variant="success">{loading}</Message> )}
                {error && ( <Message variant="danger">{error}</Message> )}
                
           
        </Form>
        
        
    )
}

export default  PasswordLost;
