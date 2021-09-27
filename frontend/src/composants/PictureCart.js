import { Image, Col } from 'react-bootstrap' 

const PictureCart = (props) => {
   
   
    
    return(
        <Col key={props.value.url} sm={4} md={2} lg={2} xl={2} className="p-3">
            <Image  style={{ width: '3rem' }} src= {props.value.url}  />
        </Col>
    )
}

export default PictureCart;