import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './composants/Header'
import Footer from './composants/Footer'
import {Container} from 'react-bootstrap'
import Home from './views/HomeScreen'
import Product from './views/ProductScreen'
import Cart from './views/CartScreen'
import LoginScreen from './views/LoginScreen'
import RegisterScreen from './views/RegisterScreen'
import ProfileScreen from './views/ProfileScreen'
import ShippingScreen from './views/ShippingScreen'
import PaymentScrren from './views/PaymentScreen'
import PlaceOrderScreen from './views/PlaceOrderScreen'
import OrderScreen from './views/OrderScreen'
import UserListScreem from './views/UserListScreem'
import UserEditScreem from './views/UserEditScreem'
import ProductListScreen from './views/ProductListScreen'
import ProductEditScreen from './views/ProductEditScreen'
import OrderListView from './views/OrderListView'
import CategoryListScreen  from './views/CategoryListScreem'
import CategoryCreateScreen from './views/CategoryCreateScreem'
import AllergenListScreen from './views/AllergenListScreen'
import AllergenCreateScreen from './views/AllergenCreateScreen' 
import RoleListScreen from './views/RoleListScreen'
// import RoleCreateScreen from './views/RoleCreateScreen'



const  App = () => {
  return (
    <Router>  
      <Header />
        <main className="py-3">
             <Container>
                <Route path='/' component={Home} exact />
                <Route path='/admin/orderList' component={OrderListView} exact  />
                <Route path='/admin/userlist' component={UserListScreem} exact  />
                <Route path='/admin/productlist' component={ProductListScreen} exact  />
                <Route path='/admin/categorylist' component={CategoryListScreen} exact  />
                <Route path='/admin/categorycreate' component={CategoryCreateScreen} exact  />
                <Route path='/admin/allergenlist' component={AllergenListScreen} exact  />
                <Route path='/admin/allergencreate' component={AllergenCreateScreen} exact  />
                <Route path='/admin/rolelist' component={RoleListScreen} exact  />
                {/* <Route path='/admin/rolecreate' component={RoleCreateScreen} exact  /> */}
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
