import React from 'react'
import Header from './composants/Header'
import Footer from './composants/Footer'
import {Container} from 'react-bootstrap'
import Home from './screens/HomeScreen'
import Product from './screens/ProductScreen'
import Cart from './screens/CartScreem'
import LoginScreem from './screens/LoginScreem'
import RegisterScreem from './screens/RegisterScreem'
import ProfileScreem from './screens/ProfileScreem'

import { BrowserRouter as Router, Route} from 'react-router-dom'


const  App = () => {
  return (
    <Router>  
      <Header />
        <main className="py-3">
             <Container>
                <Route path='/' component={Home} exact />
                <Route path='/products/:id' component={Product} exact />
                <Route path='/cart/:id?' component={Cart} exact />
                <Route path='/login' component={LoginScreem} exact />
                <Route path='/register' component={RegisterScreem} />
                <Route path='/profile' component={ProfileScreem} />
              </Container>
        
      
      </main>
      <Footer />
    </Router>
      
  )
}

export default App;
