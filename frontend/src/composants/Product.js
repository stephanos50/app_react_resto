import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Assess from './Assess'


const Product = ({product}) => {
    const picture = product.pictures.map((picture) => picture.path)
  

    return( 
        
        <Card className='my-3 p-3 rounded'>
            <Link to={`/products/${product._uuid}`}>
                <Card.Img src={picture} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/products/${product._uuid}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
                </Link>

                <Card.Text as='h5'>${product.price}</Card.Text>

                <Assess
                    value={product.cote}
                    text={`${product.cote}`}
                    reviews='commentaires' 
                />
            </Card.Body>
        </Card>
    )
       
           
    
}

export default Product;