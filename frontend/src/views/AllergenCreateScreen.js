import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { createAllergen} from '../actions/allergenActions'
import { Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Message from '../composants/Message'

const AllergenCreateScreen = ({history}) => {
    const [allergen, setAllergen] = useState('')
    const [validated, setValidated] = useState(false);
    
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        
        if(!userInfo && !userInfo.isAdmin){
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
            Go Back
            </Link>
            <br></br>
          
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <Form.Label>Create New Allergen</Form.Label>
               <Form.Control 
                    required
                    type="text"
                    placeholder="create new category"
                    value={allergen}
                    onChange={(event) => setAllergen(event.target.value)}
               />
               <br></br>
                <Button type='submit' variant='primary'>Create</Button>
           </Form>
          
        </>
    )
}

export default AllergenCreateScreen
