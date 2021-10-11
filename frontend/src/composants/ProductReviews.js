import React from 'react'
import  PropTypes from 'prop-types'
const ProductReviews = (props) => {
    const { product } = props
    return (
        <div>
            {product.name}
        </div>
    )
}

export default ProductReviews
