
import { Image, Col } from 'react-bootstrap' 

const Picture = (props) => {
    console.log(props)
    const picture = props.value.map((item) => item.path);
    return(
        <Col key={picture} sm={12} md={6} lg={4} xl={3} className="p-3">
            <Image  style={{ width: '12rem' }} src={picture}  />
        </Col>
    )
}

export default Picture;