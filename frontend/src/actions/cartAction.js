import axios from 'axios'
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    
    const  {data } = await axios.get(`/api/products/${id}`)
    
    dispatch({
        type: CART_ADD_ITEM, 
        payload: {
            id: data.id,
            name: data.name,
            price: data.price,
            picture: data.pictures,
            qty,
        },

        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    
}

export const removeFromCart = (id) =>  (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) =>  async (dispatch, getState) => {
    console.log(data)
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
      }
    await axios.put(`/api/address/shipping`,data, config )

    localStorage.setItem('shippingAddress', JSON.stringify(data))
   
}

export const savePaymentMethod = (payment) =>  (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: payment
    })
    
    localStorage.setItem('paymentMethod', JSON.stringify(payment))
}