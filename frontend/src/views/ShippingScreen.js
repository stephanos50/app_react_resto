import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Col , Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer  from '../composants/FormContainer'
import { saveShippingAddress} from '../actions/cartAction'
import CheckoutSteps  from '../composants/CheckoutSteps'
import {listCities } from '../actions/cityAction'


const ShippingScreem = ({ history }) => {

    const cart = useSelector((state) => state.cart)
    const cityList = useSelector(state => state.cityList)
    // eslint-disable-next-line
    const { loading, error, cities} = cityList

    const {shippingAddress} = cart
   
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [number, setNumber] = useState(shippingAddress.number || '')
    const [floor, setFloor] = useState(shippingAddress.floor || '')
    const [city, setCity] = useState(shippingAddress.city || {})
    

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listCities())
        
        setCity({
            id:1,
            name:'Audergem',
            zip:'1160',
        })
       
    }, [dispatch])

    
   
    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, number, floor, city }))
        history.push('/payment')
    }

    const setCityName = (city) => {
        cities.map((item) => item.name === city &&  setCity(
           {
               id: item.id,
               name: item.name,
               zip: item.zip,
           }
       ))
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 />
           <h1>Shipping</h1>
           <Form onSubmit={sumbitHandler}>
               <Row>
                   <Col md={12}>
                        <Form.Group className="mb-3" controlId='address'>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Entrez votre adresse'
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId='number'>
                            <Form.Label>Numéro</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Votre numéro'
                                value={number}
                                required
                                onChange={(e) => setNumber(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId='floor'>
                            <Form.Label>Etage</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Votre étage'
                                required
                                value={floor}
                                onChange= {
                                    (e) => 
                                    {
                                        if(e.target.value >= 0) {
                                            setFloor(e.target.value) 
                                        }
                                    }
                                       
                                }
                            ></Form.Control>
                        </Form.Group>
                    </Col>
               
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId='city'> 
                            <Form.Label>Commune</Form.Label>
                            <Form.Select aria-label="" onChange={(e) => setCityName(e.target.value)  }>
                                { cities !== undefined ? 
                                    
                                    cities.map((item) => (
                                        
                                     <option key={item.id}  value={item.name}>
                                         {item.name}
                                     </option>
                                 ))
                                   
                             :  <Redirect to='/cart' /> }
                                
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type='submit' variant='primary'>Continuer</Button>
                    </Col>
                </Row>

               
           </Form>

        </FormContainer>
    
}

export default ShippingScreem