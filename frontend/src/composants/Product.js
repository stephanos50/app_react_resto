import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Assess from './Assess'


const Product = ({product}) => {
    const picture = product.pictures.map((picture) => picture.path)
    console.log(picture)

    return( 
        <Card style={{ width: '18rem' }} className='my-2 p-2 rounded'>
            {/* <Link to={`/products/${product.id}`}>
                <Card.Img src={picture}  variant='top'   className='images' />
                
            </Link> */}

            <Card.Body>
                <Link to={`/products/${product.id}`}>
                <Card.Title as='div'>
                    <Card.Img src={picture}  variant='top'   className='images' />
                    <strong>{product.name}</strong>
                </Card.Title>
                </Link>

                

                <Assess
                    value={product.cote}
                    text={`${product.cote}`}
                    reviews='commentaires' 
                  
                />
                 <strong className='price'>{product.price} €</strong>
               
            </Card.Body>
        </Card>
    )
       
           
    
}

export default Product;