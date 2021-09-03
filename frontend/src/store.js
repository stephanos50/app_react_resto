import { createStore, combineReducers, applyMiddleware }  from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { 
    productListReducer, 
    productDetailsReducer, 
    productDeleteReducer, 
    productCreateReducer, 
    productUpdateReducer,
    productReviewCreateReducer,

} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer} from './reducers/userReducers'
import {
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer
} from './reducers/orderReducers'
import {userListReducer, userDeleteReducer, userAdminDetailsReducer, userUpdateReducer} from './reducers/adminReducers'
import {
    categoryListReducer,
    categoryCreateReducer, 
    categoryDeleteReducer,
    

} from './reducers/categoryReducers'
import {allergenListReducer, allergenCreateReducer, allergenDeleteReducer} from './reducers/allergenReducer'
import {cityListReducer} from './reducers/cityReducer'
import {rolesListReducer, roleCreateReducer, roleDeleteReducer} from './reducers/roleReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productDetails: productDetailsReducer,
    productUpdate:productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete:userDeleteReducer,
    userAdminDetails:userAdminDetailsReducer,
    userUpdate:userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    cityList:cityListReducer,
    categoryList:categoryListReducer,
    categoryCreate:categoryCreateReducer,
    categoryDelete:categoryDeleteReducer,
    allergenCreate:allergenCreateReducer,
    allergenList:allergenListReducer,
    allergenDelete:allergenDeleteReducer,
    rolesList:rolesListReducer,
    roleCreate:roleCreateReducer,
    roleDelete:roleDeleteReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productReviewCreate:productReviewCreateReducer,
})



const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {}


const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage},
    
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware )) 
)

export default store


