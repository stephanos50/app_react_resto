import React, { useState } from 'react'
import  PropTypes from 'prop-types'
import { NavItem } from 'react-bootstrap'
const NbrFacture = (props) => {
    
    const { orders } = props
   

   
        console.log(orders)
        
  

    return (
        <div>
           { Object.keys(orders).length >= 1 ? (
               Object.keys(orders).length
            ) : 0
        }
       
        </div>
    )
}
NbrFacture.propTypes = {
    orders: PropTypes.array.isRequired,
}

export default NbrFacture
