import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Col , Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer  from '../composants/FormContainer'
import { saveShippingAddress} from '../actions/cartAction'
import CheckoutSteps  from '../composants/CheckoutSteps'


const ShippingScreem = ({ history, location }) => {

    const cart = useSelector((state) => state.cart)

    const {shippingAddress} = cart
   
    let useInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    let email = null
    if(useInfo){
        email = useInfo.email
    } 
    
    
    
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [number, setNumber] = useState(shippingAddress.number || '')
    const [floor, setFloor] = useState(shippingAddress.floor || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    
    

    
    const dispatch = useDispatch()

    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, number, floor, city,email }))
        history.push('/payment')
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
                            <Form.Select aria-label="" onChange={(e) => setCity(e.target.value)  }>
                                { useInfo !== null ? 
                                    
                                    useInfo.city.map((item) => (
                                    
                                     <option key={item.name}  value={item.name}>
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