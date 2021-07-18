import React, { useState, useEffect} from 'react'
import { Row,Col } from 'react-bootstrap' 
import axios from 'axios'


const Allergene = (props) => {
    
    const [ allergene, setAllergene] = useState([])
    useEffect( () => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/allergenes/${props.allergene}`);
            setAllergene(data);

        }
       fetchProduct()
      
    }, [props]);
    
    return(
        <div>
            <Row>
                <Col>
                    {allergene.map((item) => <strong key={item}> {item} </strong>)}   
                </Col>
            </Row>
        </div>
    )
}

export default Allergene;