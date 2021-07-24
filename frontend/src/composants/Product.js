import { Link } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'
import Asses from './Assess';


const Product = (props) => {
   
    return (
       <Card className='my-3 p-2 text-center '>
            <Link to={`/products/${props.product.id}`}>
                {
                    props.product.Images.map((item) => 
                    
                     <Col key={item.id} sm={12} md={12} lg={12} xl={12} >
                        <Card.Img style={{ width: '8rem' }} src= {item.image } className='rounded-circle py-10' />
                    </Col>
                    )
                }
            </Link>
            <Card.Body>
                <Link to={`/products/${props.product.id}`}>
                    <Card.Title as='div'>
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