import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './composants/Header'
import Footer from './composants/Footer'
import {Container} from 'react-bootstrap'
import Home from './views/users/home/HomeView'

import ProductView from './views/customer/product/ProductScreen'
import AllergenListView from './views/customer/product/AllergenListView'
import PlaceOrderView from './views/customer/order/PlaceOrderScreen'
import OrderView from './views/customer/order/OrderView'
import PaymentView from './views/customer/payment/PaymentScreen'
import ProfileView from './views/customer/profil/ProfileScreen'

import CartView from './views/users/cart/CartView'
import LoginView from './views/users/login/LoginView'
import RegisterView from './views/users/register/RegisterScreen'
import ShippingView from './views/customer/shipping/ShippingView'

import PasswordLost from './views/users/password/PasswordView'
import ResetPassword from './views/users/password/ResetPassword'
import ContactView from './views/users/contact/ContactView'
import { InfoView } from './views/users/InfoView'

import UserEditView from './views/admin/users/UserEditView'
import ProductListView from './views/admin/products/ProductListScreen'
import OrderListView from './views/admin/orders/OrderListView'
import CategoryListView  from './views/admin/categories/CategoryListView'
import CategoryCreateView from './views/admin/categories/CategoryCreateView'
import AdminOrderView from './views/admin/orders/orderView'
import AdminInvoicesView from './views/admin/invoices/InvoiceViews'
import ReviewListView  from './views/admin/reviews/ReviewListView'
import UserReview from './views/admin/reviews/UserReview'
import UserInvoicesView from './views/admin/invoices/UserInvoicesView'
import InvoiceView from './views/admin/invoices/InvoiceViews'

import InvoiceUserListView from './views/admin/invoices/InvoiceUserListView'
import ProductEditView from './views/admin/products/ProductEditScreen'
import UserListView from './views/admin/users/UserListView'
import DashboardView from './views/admin/dashboad/DashboadView'



 



const  App = () => {
  return (
    <Router>  
      <Header />
        <main className="py-3">
             <Container>
                <Route path='/' component={Home} exact />
                <Route path='/admin/orderList' component={OrderListView} exact  />
                <Route path='/admin/order/:id' component={AdminOrderView} exact  />

                <Route path='/admin/userlist' component={UserListView} exact  />
                <Route path='/admin/productlist' component={ProductListView} exact  />
                <Route path='/admin/categorylist' component={CategoryListView} exact  />
                <Route path='/admin/categorycreate' component={CategoryCreateView} exact  />
                <Route path='/admin/allergenlist' component={AllergenListView} exact  />
                <Route path='/admin/product/:id/edit' component={ProductEditView} exact  />
                <Route path='/admin/:id/edit' component={UserEditView} exact  />
                <Route path='/admin/reviewsuserlist' component={ReviewListView} exact  /> 
                <Route path='/admin/userreview/:id' component={UserReview} exact  /> 
                <Route path='/admin/invoicesuserlist' component={InvoiceUserListView} exact  /> 
                <Route path='/admin/userinvoices/:id' component={UserInvoicesView} exact  /> 
                <Route path='/admin/userinvoices/invoice/:id' component={InvoiceView} exact  /> 

                
                <Route path='/admin/dashboard' component={DashboardView} exact />

                <Route path='/products/:id' component={ProductView} exact  />
                <Route path='/cart/:id?' component={CartView} exact/>
                <Route path='/login' component={LoginView} exact/>
                <Route path='/forgotpassword' component={PasswordLost} exact/>
                <Route path='/resetpassword/:resetoken' component={ResetPassword} exact/>
                <Route path='/register' component={RegisterView}exact />
                <Route path='/profile' component={ProfileView}exact />
                <Route path='/shipping' component={ShippingView} exact/>
                <Route path='/payment' component={PaymentView}exact />
                <Route path='/placeorder' component={PlaceOrderView}exact />
                <Route path='/order/:id' component={OrderView}exact />
                <Route path='/contact' component={ContactView}exact />
                <Route path='/info' component={InfoView}exact />
              </Container>
        
      
      </main>
      <Footer />
    </Router>
      
  )
}

export default App;
