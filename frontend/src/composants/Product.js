import {Card, Image} from 'react-bootstrap'
import Asses from './Assess';

const Product = (props) => {
    return (
        <Card className='my-3 text-center' border="info">
            <a href={`/product/${props.product.id}`}>
                <Image  className='my-3' style={{ width: '11rem' }} src= {`${props.product.image}` } roundedCircle  variant='' />
                   
            </a>
            <Card.Body>
                <a href={`/product/${props.product.id}`}>
                    <Card.Title as='div'>
                        <strong>{props.product.nom}</strong>
                    </Card.Title>
                </a>
                <Card.Text as='div'>
                    <Asses 
                        value={props.product.evaluation}
                        text={`${props.product.nombreDeCommentaire}`}
                        reviews='commentaires' 
                        color='#2C2169'
                    />
                </Card.Text>
                <Card.Text as='h6'>
                    <div className="my-3">
                        {props.product.prix} - Euro
                    </div>
                </Card.Text>
              
            </Card.Body>
        </Card>
    )
}

export default Product;