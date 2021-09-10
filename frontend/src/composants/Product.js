import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Assess from './Assess'
import  PropTypes from 'prop-types'


const Product = (props) => {
    
    const {product} = props
    const picture = product.pictures.map((picture) => picture.path)
    
    return( 
        <Card style={{ width: '18rem' }} className='my-2 p-2 rounded'>
            <Card.Body>
                <Link to={`/products/${product.id}`}>
                <Card.Title as='div'>
                    <Card.Img src={picture}  variant='top'   className='images' />
                    <strong>{product.name}</strong>
                </Card.Title>
                </Link>
                <Assess
                    value={product.rate}
                    text={`${product.rate}`}
                    reviews='commentaires' 
                  
                />
                 <strong className='price'>{product.price} €</strong>
               
            </Card.Body>
        </Card>
    )
       
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
}

export default Product;