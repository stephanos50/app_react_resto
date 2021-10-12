import React ,{ useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { usersInvoiceList} from '../actions/invoiceActions'
import Message from '../composants/Message'
import { Table } from 'react-bootstrap'
import Loader from '../composants/Loader'
import { Link } from 'react-router-dom'
import NbrFacture from '../composants/NbrFacture'




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
       
    }, [dispatch,history])

  
    return (
        <>
        <h1>Liste des factures</h1>
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