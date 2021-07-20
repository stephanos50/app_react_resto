import React from 'react'
import Header from './composants/Header'
import Footer from './composants/Footer'
import {Container} from 'react-bootstrap'
import Home from './screens/HomeScreen'
import Product from './screens/ProductScreen'
import { BrowserRouter as Router, Route} from 'react-router-dom'


const  App = () => {
  return (
    <Router>  
      <Header />
        <main className="py-3">
             <Container>
                <Route path='/' component={Home} exact />
                <Route path='/products/:id' component={Product} exact />
              </Container>
        
      
      </main>
      <Footer />
    </Router>
      
  )
}

export default App;
