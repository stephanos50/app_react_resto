import React ,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Table } from 'react-bootstrap'


import { usersInvoiceList} from '../../../actions/invoiceActions'
import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import NbrFacture from '../../../composants/NbrFacture'
import DashboardHeader from '../../../composants/DashboardHeader' 




const ReviewListView = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listinvoicesusers = useSelector((state) => state.listinvoicesusers)
    const {loading, error, users }  = listinvoicesusers
   
   
    
    useEffect(() => {
        if(!userInfo || userInfo.role !== "admin"){
            history.push('/login')
        } 
        dispatch(usersInvoiceList())
       
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
                            <th>Facture</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td ><NbrFacture orders={item.orders}/></td>
                                <td>
                                   
                                    <Link to={`userinvoices/${item.id}`}>facture</Link>
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
