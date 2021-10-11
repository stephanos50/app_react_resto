import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './composants/Header'
import Footer from './composants/Footer'
import {Container} from 'react-bootstrap'
import Home from './views/HomeView'
import ProductView from './views/ProductScreen'
import CartView from './views/CartView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterScreen'
import ProfileView from './views/ProfileScreen'
import ShippingView from './views/ShippingView'
import PaymentView from './views/PaymentScreen'
import PlaceOrderView from './views/PlaceOrderScreen'
import OrderView from './views/OrderView'
import UserListView from './views/UserListView'
import UserEditView from './views/UserEditView'
import ProductListView from './views/ProductListScreen'
import ProductEditView from './views/ProductEditScreen'
import OrderListView from './views/OrderListView'
import CategoryListView  from './views/CategoryListView'
import CategoryCreateView from './views/CategoryCreateView'
import AllergenListView from './views/AllergenListView'
import AllergenCreateView from './views/AllergenCreateView' 
import RoleListView from './views/RoleListView'
import RoleCreateView from './views/RoleCreateView'
import PasswordLost from './views/PasswordView'
import ResetPassword from './views/ResetPassword'
import ContactView from './views/ContactView'
import { InfoView } from './views/InfoView'
import AdminOrderView from './views/AdminOrderView'
import  ReviewListView  from './views/ReviewListView'
import UserReview from './views/UserReview'
import UserInvoicesView from './views/UserInvoicesView'
import InvoiceUserListView from './views/InvoiceUserListView'

 



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
                <Route path='/admin/allergencreate' component={AllergenCreateView} exact  />
                <Route path='/admin/rolelist' component={RoleListView} exact  />
                <Route path='/admin/rolecreate' component={RoleCreateView} exact  /> 
                <Route path='/admin/product/:id/edit' component={ProductEditView} exact  />
                <Route path='/admin/:id/edit' component={UserEditView} exact  />
                <Route path='/admin/reviewsuserlist' component={ReviewListView} exact  /> 
                <Route path='/admin/userreview/:id' component={UserReview} exact  /> 
                <Route path='/admin/invoicesuserlist' component={InvoiceUserListView} exact  /> 
                <Route path='/admin/userinvoices/:id' component={UserInvoicesView} exact  /> 
                <Route path='/admin/userinvoices/orders/:id' component={AdminOrderView} exact  /> 

                


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
