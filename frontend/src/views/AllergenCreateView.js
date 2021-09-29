import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { createAllergen} from '../actions/allergenActions'
import { Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const AllergenCreateScreen = ({history}) => {

    const [allergen, setAllergen] = useState('')

    const [validated, setValidated] = useState(false);
    
    const dispatch = useDispatch()
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo && !userInfo.role === 'admin'){
            history.push('/login')
        } 
    }, [dispatch,history,userInfo])
           
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }  else {
            dispatch(createAllergen(allergen))
            history.push('/admin/allergenlist')
        }
        
  };

    return (
        <>

            <Link to='/admin/allergenlist' className='btn btn-light my-3'>
            Retour à la liste des allergènes
            </Link>
            <br></br>
          
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId='role'>
                    <Form.Control 
                        required
                        type="text"
                        placeholder="Nouveau allergène"
                        value={allergen}
                        onChange={(event) =>  {
                            if(event.target.value.match("^[a-zA-Z éè'ç]*$")){
                            setAllergen(event.target.value)
                        }}}
                    />
                    <Form.Control.Feedback type="invalid">
                        Le champs est vide
                    </Form.Control.Feedback>
                </Form.Group>
                <br></br>
                <Button type='submit' variant='primary'>Create</Button>
           </Form>
          
        </>
    )
}

export default AllergenCreateScreen
