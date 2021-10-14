import React from 'react'
import  PropTypes from 'prop-types'
const NbrFacture = (props) => {
    
    const { orders } = props
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
