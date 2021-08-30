import { Image, Col } from 'react-bootstrap' 

const PictureCart = (props) => {
    console.log('PictureCart')
   
    const picture = props.value.map((item) => 
        
        console.log(item.path)
    );
    return(
        <Col key={picture.id} sm={4} md={2} lg={2} xl={2} className="p-3">
            <Image  style={{ width: '3rem' }} src= {picture.path}  />
        </Col>
    )
}

export default PictureCart;