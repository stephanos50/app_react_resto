import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import {Row, Col} from 'react-bootstrap'


import { invoiceListByUser, deleteInvoice} from '../../../actions/invoiceActions'
import DashboardHeader from '../../../composants/DashboardHeader' 
import SearchInvoice from '../../../composants/SeachInvoice'


const useSortableData = (items, config = null) => {
  
    const [sortConfig, setSortConfig] = React.useState(config);
  
    const sortedItems = React.useMemo(() => {
      let sortableItems = items;
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
  };
  

const UserReview = ({match, history}) => {
    const id = match.params.id;
    
    const dispatch = useDispatch()



    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listordersusers = useSelector((state) => state.listordersusers)
    const {loading, error, invoices} = listordersusers
   
    const invoiceDelete = useSelector((state) => state.invoiceDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = invoiceDelete

    const { items, requestSort, sortConfig } = useSortableData(invoices);
  
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
        return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    

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
            <Row>
                <Col md={2}> <DashboardHeader role={userInfo.role}/></Col>
                <Col> <SearchInvoice 
                        invoices={invoices} 
                        deleteInvoiceHandler={deleteInvoiceHandler} 
                        requestSort={requestSort}
                        getClassNamesFor={getClassNamesFor}
                        />
                    </Col>
            </Row>
           
           
        </div>
    )
}



export default UserReview
