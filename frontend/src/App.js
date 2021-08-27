import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './composants/Header'
import Footer from './composants/Footer'
import {Container} from 'react-bootstrap'
import Home from './screens/HomeScreen'
import Product from './screens/ProductScreen'
import Cart from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScrren from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreem from './screens/UserListScreem'
import UserEditScreem from './screens/UserEditScreem'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'








const  App = () => {
  return (
    <Router>  
      <Header />
        <main className="py-3">
             <Container>
                <Route path='/' component={Home} exact />
                <Route path='/admin/userlist' component={UserListScreem} exact  />
                <Route path='/admin/productlist' component={ProductListScreen} exact  />
                <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact  />
                <Route path='/admin/:email/edit' component={UserEditScreem} exact  />
                <Route path='/products/:id' component={Product} exact  />
                <Route path='/cart/:id?' component={Cart} exact/>
                <Route path='/login' component={LoginScreen} exact/>
                <Route path='/register' component={RegisterScreen}exact />
                <Route path='/profile' component={ProfileScreen}exact />
                <Route path='/shipping' component={ShippingScreen} exact/>
                <Route path='/payment' component={PaymentScrren}exact />
                <Route path='/placeorder' component={PlaceOrderScreen}exact />
                <Route path='/order/:id' component={OrderScreen}exact />
                
                
              </Container>
        
      
      </main>
      <Footer />
    </Router>
      
  )
}

export default App;
