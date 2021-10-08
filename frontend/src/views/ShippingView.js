import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Col , Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer  from '../composants/FormContainer'
import { saveShippingAddress} from '../actions/cartAction'
import CheckoutSteps  from '../composants/CheckoutSteps'
import {listCities } from '../actions/cityAction'


const ShippingScreem = ({ history }) => {

    const [validated, setValidated] = useState(false);

    const cart = useSelector((state) => state.cart)
    const cityList = useSelector(state => state.cityList)
    const userLogin = useSelector((state) => state.userLogin) 
    const { userInfo } = userLogin
    // eslint-disable-next-line
    const { cities} = cityList
  
    const { shippingAddress} = cart
   
    const [name, setAddress] = useState(shippingAddress.name || '')
    const [number, setNumber] = useState(shippingAddress.number || '')
    const [floor, setFloor] = useState(shippingAddress.floor || '')
    const [city, setCity] = useState(shippingAddress.city || '')
   
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } 
        if(Object.values(shippingAddress).length === 0){
            console.log("userInfo")
                setAddress(userInfo.address.name )
                setNumber(userInfo.address.number)
                setFloor(userInfo.address.floor)
                setCity(userInfo.address.city)
        }
        dispatch(listCities())
        setCity({
            id:1,
            name:'Audergem',
            zip:'1160',
        })
       
    }, [dispatch, history, shippingAddress, userInfo])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
       
        if (form.checkValidity() === false) {
            
          event.preventDefault();
          event.stopPropagation();
          setValidated(true);
        } else {
            sumbitHandler(event)
        }
       
        
      };

    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({name, number, floor, city, email:userInfo.email }))
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
           <h1>Adresse de livraison</h1>
           <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                   
                        <Form.Group as={Col} md="12" controlId='name'>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Adresse'
                                value={name}
                                required
                                onChange={(e) =>  
                                    {
                                        if(e.target.value.match("^[a-zA-Z ]*$") != null){
                                            setAddress(e.target.value)
                                        }
                                    }
                                }
                                   
                            />
                            <Form.Control.Feedback type="invalid">
                                Champ vide 
                            </Form.Control.Feedback>
                        </Form.Group>
                </Row>
                <Row>
                   
                        <Form.Group as={Col} md="4" controlId='number'>
                            <Form.Label>Numéro</Form.Label>
                            <Form.Control
                                type='text'
                                value={number}
                                required
                                onChange={ (e) => {
                                        if(e.target.value >=0){
                                            setNumber(e.target.value)
                                        }
                                    }
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                champ vide
                            </Form.Control.Feedback>
                        </Form.Group>
                    
                    
                        <Form.Group as={Col} md="4" controlId='floor'>
                            <Form.Label>Etage</Form.Label>
                            <Form.Control
                                type='text'
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
                            />
                            <Form.Control.Feedback type="invalid">
                                champ vide
                            </Form.Control.Feedback>
                        </Form.Group>
                   
               
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId='city'> 
                            <Form.Label>Commune</Form.Label>
                            <Form.Select aria-label="" onChange={(e) => setCityName(e.target.value)  }>
                            <option key={city.id}>{city.name}</option>
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