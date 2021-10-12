import React from 'react'
import  PropTypes from 'prop-types'

const NbrFacture = (props) => {
    const { orders } = props
    console.log(orders)
    return (
        <div>
           { orders.payment ? (
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
