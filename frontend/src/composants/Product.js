import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import Assess from './Assess'




const Product = (props) => {
    const product = props.product
    
    return  <>
        <Col>
        { product.pictures.map((item) =>  
            
            <Card className='my-3 p-2 text-center' key={`${product.id }`}>
            <Link to={`/products/${product.id}`}></Link>
            <Card.Body>
                <Link to={`/products/${product.id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Col key={item.id} sm={12} md={12} lg={12} xl={12} >
                    <Card.Img style={{ width: '8rem' }} src= {item.path } className='rounded-circle py-10' />
                </Col>
                <Card.Text as='div'>
                    <Assess 
                        value={product.cote}
                        text={`${product.cote}`}
                        reviews='commentaires' 
                        
                    />
                </Card.Text>
                <Card.Text as='h6'>
                    {product.price} - Euro
                </Card.Text>
            
            </Card.Body>
        </Card>
    
       )

       
       }

       </Col></>
           
           
    
}

export default Product;