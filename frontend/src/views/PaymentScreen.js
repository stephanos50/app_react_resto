import { useState } from 'react'
import { Form, Button, Col , Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer  from '../composants/FormContainer'
import { savePaymentMethod} from '../actions/cartAction'
import CheckoutSteps  from '../composants/CheckoutSteps'


const PaymentScreem = ({ history }) => {
   
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setpaymentMethod] = useState('PayPal')
  

    const dispatch = useDispatch()

    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
           <h1 className='md'>Payment Method</h1>
           <Form onSubmit={sumbitHandler}>
                <Form.Group className='mb-3'>
                    <Form.Label as='legend'>Select Method</Form.Label>
                </Form.Group>
                <Row>
                <Col>
                    <Form.Check className='mb-3'
                        type='radio' 
                        label='PayPal or Credit Card' 
                        id='PayPal' 
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setpaymentMethod(e.target.value)}
                    ></Form.Check>
               
                    
                </Col>
                </Row>
          
                <Button type='submit' variant='primary'>Continuer</Button>
            </Form>
        </FormContainer>
    
}

export default PaymentScreem