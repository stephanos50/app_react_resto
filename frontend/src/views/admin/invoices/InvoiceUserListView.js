import React ,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Table } from 'react-bootstrap'


import { usersInvoiceList} from '../../../actions/invoiceActions'
import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import NbrFacture from '../../../composants/NbrFacture'
import DashboardHeader from '../../../composants/DashboardHeader' 
import InvoiceByName from '../../../composants/InvoiceByName'



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
        <DashboardHeader role={userInfo.role}/>
        <InvoiceByName  users={users} />
        </>
       
    )
}

export default ReviewListView
