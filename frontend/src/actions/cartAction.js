import axios from 'axios'
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (uuid, qty) => async (dispatch, getState) => {
    
    const  {data } = await axios.get(`/api/products/${uuid}`)
    
    
    dispatch({
        type: CART_ADD_ITEM, 
        payload: {
            uuid: data._uuid,
            name: data.name,
            price: data.price,
            picture: data.pictures,
            qty,
        },

        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    
}

export const removeFromCart = (uuid) =>  (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: uuid
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) =>  (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    
    localStorage.setItem('shippingAddress', JSON.stringify(data))
    
}

export const savePaymentMethod = (payment) =>  (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: payment
    })
    
    localStorage.setItem('paymentMethod', JSON.stringify(payment))
}