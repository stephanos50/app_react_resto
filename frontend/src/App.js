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







const  App = () => {
  return (
    <Router>  
      <Header />
        <main className="py-3">
             <Container>
                <Route path='/' component={Home} exact />
                <Route path='/products/:id' component={Product} exact />
                <Route path='/cart/:id?' component={Cart} exact />
                <Route path='/login' component={LoginScreen} exact />
                <Route path='/register' component={RegisterScreen} />
                <Route path='/profile' component={ProfileScreen} />
                <Route path='/shipping' component={ShippingScreen} />
                <Route path='/payment' component={PaymentScrren} />
                <Route path='/placeorder' component={PlaceOrderScreen} />
                
              </Container>
        
      
      </main>
      <Footer />
    </Router>
      
  )
}

export default App;
