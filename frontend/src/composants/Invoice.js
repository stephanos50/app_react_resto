
import React, { useState }from 'react-dom'
import  PropTypes from 'prop-types'
import SearchFacture from './SearchFacture'

const Facture = (props) => {
   
    const { orders } = props
   
    let total = 0;
   
    
   
    return (
      <>
      <SearchFacture 
          orders={orders}
          getClassNamesFor={props.getClassNamesFor}
          requestSort={props.requestSort}
          setstate={props.setstate}
          state={props.state}
      
      />
       
      </>
    )
}


Facture.propTypes = {
  orders: PropTypes.array.isRequired,
}

export default Facture;
