import { Image, Col } from 'react-bootstrap' 

const PictureCart = (props) => {
    console.log(props.value.picture)
    const picture = props.value.picture.map((item) => item.path);
    console.log(picture)
    return(
        <Col key={picture} sm={4} md={2} lg={2} xl={2} className="p-3">
            <Image  style={{ width: '3rem' }} src={picture}  />
        </Col>
    )
}

export default PictureCart;