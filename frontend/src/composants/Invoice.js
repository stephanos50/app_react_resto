
import React from 'react-dom'
import  PropTypes from 'prop-types'
import {Table } from 'react-bootstrap'

import { format } from 'date-fns';

const Facture = (props) => {
    const { invoices } = props
    console.log(invoices)
    return (
      <>
         <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Numéro</th>
              <th> Date</th>
              <th>Courriel</th>
            </tr>
          </thead>
          <tbody>
              {invoices.map((item) => 
                <tr key={item.uid}>
                   <td>{item.payment.order.number}</td> 
                   <td>{format(new Date(item.payment.order.createAt),'dd-MM-yyyy')}</td>
                    
                   <td>{item.payment.order.user.first_name}</td> 
                   </tr>
              )}
           
          </tbody>
        </Table>
      </>
    )
}


Facture.propTypes = {
  invoices: PropTypes.array.isRequired,
}

export default Facture;
