import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { createCategory} from '../actions/categoryAction'
import { Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Message from '../composants/Message'

const CategoryCreateScreem = ({history}) => {

    const [category, setCategory] = useState('')
    
    const dispatch = useDispatch()

    const categoryCreate = useSelector((state) => state.categoryCreate)
    const { error, success } = categoryCreate

    console.log(error)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    
    useEffect(() => {
        
        if(!userInfo && !userInfo.isAdmin){
            history.push('/login')
        } 
    }, [dispatch,history,userInfo, success])
           
  

    const handleSubmit = () => {
        dispatch(createCategory(category))
        history.push('/admin/categorylist')
    }

    
    
    
    return (
        <>
            <Link to='/admin/categoryList' className='btn btn-light my-3'>
            Go Back
            </Link>
           <Form onSubmit={handleSubmit}>
               {error && <Message>{error}</Message>}
               <Form.Label>Create New Category</Form.Label>
               <Form.Control 
                    type="text"
                    placeholder="create new category"
                    name="category"
                    onChange={(event) => setCategory(event.target.value)}
               ></Form.Control>
               <br></br>
                <Button type='submit' variant='primary'>Create</Button>
           </Form>
          
        </>
    )
}
export default CategoryCreateScreem;