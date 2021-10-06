import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_PASSWORD_REQUEST, 
    USER_PASSWORD_SUCCESS, 
    USER_PASSWORD_FAIL, 
    USER_RESETPASSWORD_REQUEST,
    USER_RESETPASSWORD_SUCCESS,
    USER_RESETPASSWORD_FAIL,
 


} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import axios from 'axios'


export const login = (email, password)=> async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('api/users/login', {email, password}, config)
        
        localStorage.setItem('userInfo', JSON.stringify(data))
        
        localStorage.setItem('shippingAddress', JSON.stringify(data.address))
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        

    
    } catch (error) {
        
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('__paypal_storage__')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/'
}

export const register = (first_name, last_name, email, password)=> async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('api/users', {first_name,last_name,email, password}, config)
       
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.setItem('shippingAddress', JSON.stringify(data.address))
    
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



export const getUserDetails = (id) => async(dispatch, getState) => {
   
    try {           
        dispatch({
            type: USER_DETAILS_REQUEST,
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

        const { data } = await axios.get(`api/users/${id}`, config)
        
       
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {           
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
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
       
        const { data } = await axios.put(`api/users/profile`, user, config)
       
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
          })
       
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/users`, config)
      
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      })
    }
  }

  export const changePassword = (email)=> async(dispatch) => {
     
    try {
        dispatch({
            type: USER_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('api/authentification/forgotpassword', {email}, config)
       
        dispatch({
            type: USER_PASSWORD_SUCCESS,
            payload: data.success
        })
       
    } catch (error) {
        
        dispatch({
            type: USER_PASSWORD_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const userResetPassword = (resetoken, password)=> async(dispatch) => {
    console.log(resetoken)
    try {
        dispatch({
            type: USER_RESETPASSWORD_REQUEST,
        })
  
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('api/authentification/resetpassword',{resetoken, password},config)
      
        dispatch({
            type: USER_RESETPASSWORD_SUCCESS,
            payload: data.success
           
        })
       
    } catch (error) {
        
        dispatch({
            type: USER_RESETPASSWORD_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
  }
  
  
  