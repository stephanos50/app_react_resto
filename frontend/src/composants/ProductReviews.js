import React from 'react'
const ProductReviews = (props) => {
    const { product} = props
    console.log(props)
    return (
        <div>
            <strong key={product.id}> {product.name}</strong>
        </div>
    )
}

export default ProductReviews
