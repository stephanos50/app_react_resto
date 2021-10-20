import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../../composants/FormContainer'
import Message from '../../../composants/Message'
import { userResetPassword } from '../../../actions/userActions'
import { Redirect } from "react-router-dom"

const ResetPassword = ({match}) => {
    const resetoken = match.params.resetoken;
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userPasswordReset = useSelector((state) => state.userPasswordReset)


    const { loading} = userPasswordReset
   
    useEffect(() => {
       if(loading){
         <Redirect to="/login"/>
       }
       
    },[dispatch, loading])
    

    const submitHandler = (e) => { 
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
         
        } else if(password !== confirmPassword) {
            e.preventDefault()
            setValidated(true);
            setMessage('Votre mot de passe ne correspond pas')
            
        } else {
            
           dispatch(userResetPassword(resetoken, password))
        }
    }

    return (
        <FormContainer>
        <h1>Nouveau mot de passe</h1>
        {loading && <Redirect to="/login" />}
        <Form noValidate validated={validated}  onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId='password'>
                <Form.Label>Votre mot de passe</Form.Label>
                <Form.Control 
                    required
                    type='password'
                    placeholder='Entrez votre mot de passe ' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                Votre champ est vide
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId='confirmPassword'>
                <Form.Label>Confirmez votre mot de passe</Form.Label>
                <Form.Control 
                    required
                    type='password'
                    placeholder='Confirmez votre mot de passe ' 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Votre champ est vide
                </Form.Control.Feedback>
                <Form.Control.Feedback >{message && <Message variant="danger">{message}</Message>}</Form.Control.Feedback>

                </Form.Group>
            <Button type='submit' variant='primary'>Valider</Button>
        </Form>
        
        
           
        

    </FormContainer>
    )
}

export default  ResetPassword;