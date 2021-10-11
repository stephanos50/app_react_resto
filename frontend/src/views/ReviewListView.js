import React ,{ useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { usersList} from '../actions/reviewActions'
import Message from '../composants/Message'
import { Table } from 'react-bootstrap'
import Loader from '../composants/Loader'
import { Link } from 'react-router-dom'




const ReviewListView = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listusers = useSelector((state) => state.listusers)
    const {loading, error, users }  = listusers
   

    
   
    
    useEffect(() => {
        if(!userInfo || userInfo.role !== "admin"){
            history.push('/login')
        } 
        dispatch(usersList())
       
    }, [dispatch,history])

  
    return (
        <>
        <h1>Liste des Commentaires</h1>
        {loading ? (
            <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : ( 
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Couriel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td>
                                    
                                    <Link to={`userreview/${item.id}`}>commentaires</Link>
                                   {/* <Link to={{
                                       pathname:`userreview/${item.id}`,
                                       aboutProps:{
                                        reviews:item.reviews,
                                        name:item.first_name
                                       },
                                       
                                   }}>commentaires</Link> */}
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ReviewListView