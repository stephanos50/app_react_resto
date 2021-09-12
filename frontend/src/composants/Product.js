import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Assess from './Assess'
import  PropTypes from 'prop-types'


const Product = (props) => {
    
    const {id} = props
    const {name} = props
    const {price} = props
    const {rate} = props
    const {comment} = props
    const {pictures} = props
    
    const picture = pictures.map((picture) => picture.path)
   
    
    return( 
        <Card style={{ width: '18rem' }} className='my-2 p-2 rounded'>
            <Card.Body>
                <Link to={`/products/${id}`}>
                <Card.Title as='div'>
                    <Card.Img src={picture}  variant='top'   className='images' />
                    <strong className="title-product">{name}</strong>
                </Card.Title>
                </Link>
                <Assess
                    value={rate}
                    text={comment}
                    reviews='commentaires' 
                  
                />
                 <strong className='price-product'>{price} €</strong>
               
            </Card.Body>
        </Card>
    )
       
}

Product.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    comment: PropTypes.number.isRequired,
    pictures: PropTypes.array.isRequired,
}

export default Product;