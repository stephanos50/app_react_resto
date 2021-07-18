import { Link } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'
import Asses from './Assess';


const Product = (props) => {
    
    return (
       <Card className='my-3 p-2 text-center '>
            <Link to={`/product/${props.product.id}`}>
                {props.image.map(product =>(
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                         <Card.Img  className='my-2 rounded-circle' style={{ width: '9rem' }} src= {product.image } />
                    </Col>
                    
                ))}
                
            </Link>
            <Card.Body>
                <Link to={`/product/${props.product.id}`}>
                    <Card.Title as='div'>
                        <p>{props.product.categorie}</p>
                        <strong>{props.product.plat}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Asses 
                        value={props.product.cote}
                        text={`${props.product.cote}`}
                        reviews='commentaires' 
                        
                    />
                </Card.Text>
                <Card.Text as='h6'>
                    {props.product.prix} - Euro
                </Card.Text>
              
            </Card.Body>
        </Card>
    )
}

export default Product;