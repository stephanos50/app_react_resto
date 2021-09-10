import { PayPalButton}  from 'react-paypal-button-v2'
import Loader from '../composants/Loader'
import { ListGroup} from 'react-bootstrap'


const PayPal = (props) => {
    return (
        <ListGroup.Item>
        {props.loadingPay && <Loader />}
        {!props.sdkReady ? (
            <Loader />
        ) : (
            <PayPalButton
            amount={props.order}
            onSuccess={props.successPaymentHandler}
            />
        )}
        </ListGroup.Item>
    )
}

export default PayPal