import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Asses from './Assess';

const Product = (props) => {
    return (
        <Card className='my-3 p-2 text-center '>
            <Link to={`/product/${props.product.id}`}>
                <Card.Img  className='my-2 rounded-circle' style={{ width: '9rem' }} src= {props.product.image } />
                   
            </Link>
            <Card.Body>
                <Link to={`/product/${props.product.id}`}>
                    <Card.Title as='div'>
                        <strong>{props.product.nom}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Asses 
                        value={props.product.evaluation}
                        text={`${props.product.nombreDeCommentaire}`}
                        reviews='commentaires' 
                        color='#2C2169'
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