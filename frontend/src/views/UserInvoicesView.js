import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { invoiceListByUser, deleteInvoice} from '../actions/invoiceActions'
import { Link } from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import { toast } from 'react-toastify'
import Message from '../composants/Message'
import Loader from '../composants/Loader'

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
            toast.success("Utilisateur supprimer")
        }
    
        
    }, [dispatch,history,match,userInfo,successDelete])

    const deleteInvoiceHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteInvoice(id))
        }
    };

  

    return (
        <div>
            <h1>Facture des utilisateurs <strong className="text-capitalize"></strong></h1>
             <Link to='/admin/invoicesuserlist' className='m-3'> <Button> Retour </Button></Link>

             { loading ? <Loader /> : error ?  <Message variant='error'>{error}</Message> : (
                <Table>
                     <thead>
                         <tr>
                            <th>Numéro</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                     </thead>
                     <tbody>
                     { invoices.map((item,key) =>  ( item.payment.invoice.delete &&  (
                          <tr key={key}>
                                 <td>{item.date_number}</td>
                                 <td>{item.date_createAt}</td>
                                 <td>{item.total} €</td>
                                 <td>{item.isDelivered}</td>
                                 <td> <Link  key={item.id} to={{
                                     pathname:`orders/${item.id}`,
                                     }}><i className="fa fa-eye p-2"></i></Link>
                                     <i className='fa fa-trash'
                                         onClick={() => deleteInvoiceHandler(item.id)}
                                     ></i>
                                 </td>
                             </tr>
                            )
                         )
                     )}
                 </tbody>
             </Table>
             )}
              

             
            
             
        </div>
    )
}



export default UserReview
