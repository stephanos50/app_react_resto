import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'



import { invoiceListByUser, deleteInvoice} from '../../../actions/invoiceActions'
import DashboardHeader from '../../../composants/DashboardHeader' 
import SearchInvoice from '../../../composants/SeachInvoice'


const UserReview = ({match, history}) => {
    const id = match.params.id;
    
    const dispatch = useDispatch()



    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listordersusers = useSelector((state) => state.listordersusers)
    const {loading, error, invoices} = listordersusers
   
    const invoiceDelete = useSelector((state) => state.invoiceDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = invoiceDelete

    

    useEffect(() => {
        if(!userInfo && !userInfo.role === "admin"){
            history.push('/login')
        }
        dispatch(invoiceListByUser(id))
        if(loadingDelete){
            toast.success("Facture supprimer")
        }
    
        
    }, [dispatch,history,match,userInfo,successDelete])

    const deleteInvoiceHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteInvoice(id))
        }
    };

    console.log(invoices)

    return (
        <div>
            <DashboardHeader role={userInfo.role}/>
            <SearchInvoice invoices={invoices} deleteInvoiceHandler={deleteInvoiceHandler} />
        </div>
    )
}



export default UserReview
