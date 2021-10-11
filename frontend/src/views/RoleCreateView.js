// import React from 'react'
// import {useState, useEffect} from 'react'
// import { useDispatch, useSelector} from 'react-redux'
// import { createRole} from '../actions/roleActions'
// import { Form, Button} from 'react-bootstrap'
// import {Link} from 'react-router-dom'

// const RoleCreate = ({history}) => {
//     const [role, setRole] = useState('')

//     const [validated, setValidated] = useState(false);
    
//     const dispatch = useDispatch()

//     const userLogin = useSelector((state) => state.userLogin)
//     const { userInfo } = userLogin

//     useEffect(() => {
        
//         if(!userInfo ||  userInfo.role !== "admin"){
//             history.push('/login')
//         } 
//     }, [dispatch,history,userInfo])
           
//     const handleSubmit = (event) => {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//             setValidated(true);
//         }  else {
//             dispatch(createRole(role))
//             history.push('/admin/rolelist')
//         }
        
//   };

//     return (
//         <>

//             <Link to='/admin/rolelist' className='btn btn-light my-3'>
//             Go Back
//             </Link>
//             <br></br>
          
//             <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId='role'>
//                     <Form.Control 
//                         required
//                         type="text"
//                         placeholder="ajouté un role"
//                         value={role}
//                         onChange={(event) =>  {
//                             if(event.target.value.match("^[a-zA-Z éè'ç]*$")){
//                                 setRole(event.target.value)
//                             }}}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             Le champs est vide
//                         </Form.Control.Feedback>
//                     </Form.Group>
//                <br></br>
//                 <Button type='submit' variant='primary'>Create</Button>
//            </Form>
          
//         </>
//     )
// }

// export default RoleCreate
