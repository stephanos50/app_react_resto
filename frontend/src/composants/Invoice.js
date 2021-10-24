
import React, { useState }from 'react-dom'
import  PropTypes from 'prop-types'
import {Table } from 'react-bootstrap'

import { format } from 'date-fns';

const Facture = (props) => {
   
    const { orders } = props
   
    let total = 0;
   
    
   
    return (
      <>
         <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Numéro</th>
              <th><strong
                    type="button"
                    style={{color: "#AF1025"}}
                    onClick={() => props.requestSort('createAt')}
                    className={props.getClassNamesFor('createAt')}
                  >
                    Date</strong></th>
              <th><strong
                    type="button"
                    style={{color: "#AF1025"}}
                    onClick={() => props.requestSort('userId')}
                    className={props.getClassNamesFor('userId')}
                  >
                    Nom</strong></th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
              {orders.map((item) => 
                <tr key={item.uid}>
                  <td>{item.number}</td> 
                  <td>{format(new Date(item.createAt),'dd-MM-yyyy')}</td>
                  <td>{item.user.first_name}</td> 
                  <td>{item.total}{props.setstate(total += item.total)}</td> 
                  
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
                <td><strong>{Math.round(((props.state/100*6) + Number.EPSILON) * 100) / 100}</strong></td>
              </tr>
              
          </tbody>
         
         
        </Table>
      </>
    )
}


Facture.propTypes = {
  orders: PropTypes.array.isRequired,
}

export default Facture;
