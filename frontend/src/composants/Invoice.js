
import React, { useState }from 'react-dom'
import  PropTypes from 'prop-types'
import {Table } from 'react-bootstrap'

import { format } from 'date-fns';

const Facture = (props) => {
   
    const { invoices } = props
    
    let total = 0;
    
   
    return (
      <>
         <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Numéro</th>
              <th> Date</th>
              <th>Nom</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
              {invoices.map((item) => 
                <tr key={item.uid}>
                  <td>{item.payment.order.number}</td> 
                  <td>{format(new Date(item.payment.order.createAt),'dd-MM-yyyy')}</td>
                  <td>{item.payment.order.user.first_name}</td> 
                  <td>{item.payment.order.total}{props.setstate(total += item.payment.order.total)}</td> 
                  
                </tr>
              )}
              <tr>
                  <td></td>
                  <td></td>
                  <td><strong>Total</strong></td>
                  <td><strong>{props.state}</strong></td>
              </tr>
              
              <tr>
                <td></td>
                <td></td>
                <td><strong>TVA 6%</strong></td>
                <td><strong>{props.state/100*6}</strong></td>
              </tr>
              
          </tbody>
         
         
        </Table>
      </>
    )
}


Facture.propTypes = {
  invoices: PropTypes.array.isRequired,
}

export default Facture;
