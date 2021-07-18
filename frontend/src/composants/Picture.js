import React, { useState, useEffect} from 'react'
import { Image, Col } from 'react-bootstrap' 
import axios from 'axios'


const Picture = (props) => {
   
    const [ picture, setPicture] = useState({})
    useEffect( () => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/image/${props.picture}`);
            setPicture(data);

        }
       fetchProduct()
       
    }, [props]);
    return(
        <Col key={picture.id} sm={12} md={6} lg={4} xl={3} className="p-3">
            <Image  style={{ width: '12rem' }} src={picture.image}  />
        </Col>
            
        
    )

}

export default Picture;