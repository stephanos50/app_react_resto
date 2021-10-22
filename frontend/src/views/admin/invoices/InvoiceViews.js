import { Link } from 'react-router-dom'
import {  useEffect } from 'react'
import { Preview, print } from 'react-html2pdf'

import { Row, Col, ListGroup,Button, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../composants/Message'
import Loader from '../../../composants/Loader'
import { getOrderDetails } from '../../../actions/orderAction'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../../../constants/orderConstants'
import { format } from 'date-fns';


const AdminOrderView = ({match, history}) => {

    const orderId  = match.params.id
    
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails) 
    const { order, loading, error } = orderDetails
    
    const orderPay = useSelector((state) => state.orderPay)
    const { success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin) 
    const { userInfo } = userLogin

    

   

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } 
        
        if(!order ||  successPay || order.id !== Number(orderId) || successDeliver){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
            
            
        } 
     },[dispatch, history, userInfo, orderId, successPay, successDeliver,order])

   
    

     
      

    return loading ? <Loader /> : error ?  <Message variant='error'>{error}</Message> : <>
       
        <Preview id={'jsx-template'}>
        <Row> <Col md={{ span: 4, offset: 4 }}><img src="/images/logo/logo.jpg" className="d-inline-block align-top" alt="Coeur Bleu Logo" /></Col> </Row>
        <Row><Col  md={{ span: 6, offset: 4 }}><p>Chaussée d'Alsemberg 4, 1630 Linkebeek</p></Col></Row>
        <Row>

            <Col md={8}>
            <ListGroup variant='flush'>
                        <ListGroup.Item>
                           
                            <h6> <strong> Nom : </strong>   {`${order.user.first_name}`}</h6>
                            <h6> <strong> Prénom : </strong>   {`${order.user.last_name}`}</h6>
                            <ListGroup variant='flush'>
                                <h6> 
                                    <strong>Address: </strong> 
                                    {order.address.name} 
                                        - numéro: {order.address.number} 
                                        - étage: {order.address.floor}
                                </h6>
                                <h6> <strong>Commune: </strong> {order.address.city.zip} - {order.address.city.name}</h6>
                            </ListGroup>
                            <h6>  <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email} </a></h6>

                            <br></br>
                </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col  md={4}>
            
                <h6>Date:  {format(new Date(order.createAt),'dd-MM-yyyy')}  </h6>
                <h6> Facture Numéro: {order.number}</h6>
                
            </Col>
        </Row>
        <Row>
            <Col md={8}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Déscription</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.product0rders.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>{order.total} €</td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
        </Preview>
        <Button onClick={()=>print('a', 'jsx-template')}> Imprimer</Button>
        <Row>
            <Link to='/admin/invoicesuserlist' className='m-3'> <Button> Retour </Button></Link>
            
        </Row>
       
    </>
       

}

export default AdminOrderView