import React, { useState } from 'react'
import  PropTypes from 'prop-types'
import NbrInvoices from '../composants/NbrInvoices'
import { NavItem } from 'react-bootstrap'
const NbrFacture = (props) => {
    const [nbr, setNbr] = useState('')
    const { orders } = props
    let cpt = 0

    const nbrpayemnt = () => {
        setNbr(++cpt)
    }
        
        
  

    return (
        <div>
           { Object.keys(orders).length >= 1 ? (
               Object.keys(orders).length
            ) : 0
        }
        {nbr}
        </div>
    )
}
NbrFacture.propTypes = {
    orders: PropTypes.array.isRequired,
}

export default NbrFacture
