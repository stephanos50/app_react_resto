import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {sendMessage} from '../actions/contactActions'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../composants/FormContainer'
import { Link } from 'react-router-dom'
import { toast} from 'react-toastify'
import { USER_MESSAGE_RESET } from '../constants/contactConstants'



const ContactView = () => {

    const dispatch = useDispatch()

    const [validated, setValidated] = useState();
    const [email, setEmail] = useState('')
    const [textarea, setTextarea] = useState('')

    const messageContact = useSelector((state) => state.messageContact)
    const {success} = messageContact

    useEffect(()=> {
        if(success){
            toast.success('Le mail a bien été envoyé') 
            dispatch({type: USER_MESSAGE_RESET})
            
        }
    },[dispatch, success])
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            toast.error('Erreur sur les champs') 
         
        } else {
            event.preventDefault()
            dispatch(sendMessage(email,textarea))
           
        }
    };

    return (
        <FormContainer>
            <h1>Contactez-nous</h1>
            <Form noValidate validated={validated}  onSubmit={handleSubmit}>
                
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        required
                        type="email" 
                        value={email}
                        placeholder="Votre email" 
                        onChange={(e) =>  
                            {
                                if(e.target.value.match("^[a-zA-Z@.]*$") != null){
                                    setEmail(e.target.value)
                                }
                            }
                        }
                        
                    />

                </Form.Group>
                <Form.Control.Feedback type="invalid"> Email incorrecte </Form.Control.Feedback>   
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Votre message ..."
                        required
                        onChange={(e) =>  
                            {
                                if(e.target.value.match("^[a-zA-Z@.]*$") != null){
                                    setTextarea(e.target.value)
                                }
                            }
                        }
                    />

                </Form.Group>
                <Form.Control.Feedback type="invalid"> Email incorrecte </Form.Control.Feedback>
                
                <br></br>
                <Button type='submit' variant='primary'>Envoyer</Button> 
                <Link to='/' className='m-3'> <Button> Retour </Button></Link>                         
            </Form>
            
           
                <hr></hr>
               
               
               
               
                
           
       
        </FormContainer>
        
            
           
           
       
    )
}


export default ContactView