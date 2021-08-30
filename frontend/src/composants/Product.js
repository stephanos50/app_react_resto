import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Assess from './Assess'


const Product = ({product}) => {
    const picture = product.pictures.map((picture) => picture.path)
    console.log(picture)

    return( 
        <Card style={{ width: '18rem' }} className='my-2 p-2 rounded'>
            <Link to={`/products/${product.id}`}>
                <Card.Img src={picture}  variant='top'  style={{ width: '17rem'  }} />
                
            </Link>

            <Card.Body>
                <Link to={`/products/${product.id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
                </Link>

                <Card.Text as='h6'>{product.price} €</Card.Text>

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