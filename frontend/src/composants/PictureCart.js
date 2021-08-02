import { Image, Col } from 'react-bootstrap' 

const PictureCart = (props) => {
    
    const picture = props.value.picture.map((item) => item.path);
    
    return(
        <Col key={picture} sm={4} md={2} lg={2} xl={2} className="p-3">
            <Image  style={{ width: '3rem' }} src={picture}  />
        </Col>
    )
}

export default PictureCart;