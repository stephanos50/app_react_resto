import React ,{ useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { usersList} from '../../../actions/reviewActions'
import Message from '../../../composants/Message'
import { Table } from 'react-bootstrap'
import Loader from '../../../composants/Loader'
import { Link } from 'react-router-dom'
import DashboardHeader from '../../../composants/DashboardHeader' 




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
       
    }, [dispatch,history,userInfo])

  
    return (
        <>
        <DashboardHeader />
       
        {loading ? (
            <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : ( 
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Couriel</th>
                            <th>Commentaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td >{Object.keys(item.reviews).length}</td>
                               <td><Link to={`userreview/${item.id}`}>commentaires</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ReviewListView



