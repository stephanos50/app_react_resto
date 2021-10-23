import React ,{ useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Table } from 'react-bootstrap'

import { facturesList} from '../../../actions/facturesActions'
import Invoice from '../../../composants/Invoice'
import DashboardHeader from '../../../composants/DashboardHeader'


  

const FacturesView = ({history}) => {

    const dispatch = useDispatch()

    const [state, setstate] = useState(0)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listFacture = useSelector((state) => state.listFacture)
    const {loading, error, invoices }  = listFacture
    
   
    
    useEffect(() => {
        if(!userInfo || userInfo.role !== "admin"){
            history.push('/login')
        } 
        dispatch(facturesList())
       
   
    }, [dispatch,history,userInfo,state])

  
    return (
        <>
        <Row>
            {loading}
            {error}
            <Col md={2}><DashboardHeader role={userInfo.role}/></Col>
            
            <Col> <Invoice invoices= {invoices} setstate={setstate} state={state}/></Col>
           
        </Row>
       
       
        
       
        </>
       
    )
}

export default FacturesView
