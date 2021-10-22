import React ,{ useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { facturesList} from '../../../actions/facturesActions'
import Facture from '../../../composants/Facture'
import DashboardHeader from '../../../composants/DashboardHeader'


  

const FacturesView = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const listFacture = useSelector((state) => state.listFacture)
    const {loading, error, invoices }  = listFacture
    
   
    
    useEffect(() => {
        if(!userInfo || userInfo.role !== "admin"){
            history.push('/login')
        } 
        dispatch(facturesList())
       
    }, [dispatch,history,userInfo])

  
    return (
        <>
        <Row>
            {loading}
            {error}
            <Col md={2}><DashboardHeader role={userInfo.role}/></Col>
            
            <Col> <Facture invoices= {invoices}/></Col>
        </Row>
        
       
        </>
       
    )
}

export default FacturesView
