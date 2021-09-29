import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { createCategory} from '../actions/categoryAction'
import { Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import FormContainer from '../composants/FormContainer'

const CategoryCreateScreem = ({history}) => {

    const [validated, setValidated] = useState(false);

    const [category, setCategory] = useState('')
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
   
    
    useEffect(() => {
        if(!userInfo && !userInfo.role === 'admin'){
            history.push('/login')
        } else if (userInfo && userInfo.role !== 'admin'){
            history.push('/login')
        }
    }, [dispatch,history,userInfo]);
           
   

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
         
        } else {
            dispatch(createCategory(category))
            history.push('/admin/categorylist')
        }
    };

    return (
        <FormContainer>
            <Link to='/admin/categoryList' className='btn btn-light my-3'>
                Retour à la liste
            </Link>
            <Form noValidate validated={validated}  onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId='category'>
                        <Form.Control
                            required
                            type='category'
                            placeholder='Nouvelle catégotie' 
                            value={category}
                            onChange={(event) =>  {
                                if(event.target.value.match("^[a-zA-Z éè'ç]*$")){
                                        setCategory(event.target.value)
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                           Le champs est vide
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Valider</Button>
           </Form>


            </FormContainer>
            
          
        
    )
}
export default CategoryCreateScreem;



