import {

    ADMIN_USERINVOICESLIST_FAIL,
    ADMIN_USERSINVOICELIST_REQUEST,
    ADMIN_USERINVOICESLIST_SUCCESS,
    
    ADMIN_USERINVOICE_REQUEST,
    ADMIN_USERINVOICE_SUCCESS, 
    ADMIN_USERINVOICE_FAIL,
    

    ADMIN_DELETEINVOICE_REQUEST,
    ADMIN_DELETEINVOICE_SUCCESS, 
    ADMIN_DELETEINVOICE_FAIL 

} from '../constants/invoiceConctants'

import axios from 'axios'


export const usersInvoiceList = () => async (dispatch, getState) => {
 
    try {
      dispatch({ type: ADMIN_USERSINVOICELIST_REQUEST })
      
      const { userLogin: { userInfo } } = getState()
  
      const config = { 
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        } 
      }
  
      const { data } = await axios.get(`/api/invoices`, config)
      
      dispatch({
        type: ADMIN_USERINVOICESLIST_SUCCESS,
        payload: data,
      })
      
    } catch (error) {
      dispatch({
        type: ADMIN_USERINVOICESLIST_FAIL,
        payload: error.response  && error.response.data.message
            ? error.response.data.message
            : error.message,
    })
    }
  }



export const invoiceListByUser = (id) => async (dispatch, getState) => {
 
  try {
    dispatch({ type: ADMIN_USERINVOICE_REQUEST })
    
    const { userLogin: { userInfo } } = getState()

    const config = { 
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      } 
    }

    const { data } = await axios.get(`/api/invoices/${id}`, config)
    
    
    
    dispatch({
      type: ADMIN_USERINVOICE_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
    dispatch({
      type: ADMIN_USERINVOICE_FAIL,
      payload: error.response  && error.response.data.message
          ? error.response.data.message
          : error.message,
  })
  }
}



export const deleteInvoice = (id) => async(dispatch, getState) => {
  
  try {    
      dispatch({ 
          type:ADMIN_DELETEINVOICE_REQUEST,
      })
  
      const { 
          userLogin : {userInfo},
      } = getState()
  
      const config = {
          headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
      }
  
      await axios.delete(`/api/invoices/${id}`, config)
  
      dispatch({ 
          type: ADMIN_DELETEINVOICE_SUCCESS,
      })
      
     } catch (error) {
          dispatch({ 
              type: ADMIN_DELETEINVOICE_FAIL,
              payload: error.response  && error.response.data.message
              ? error.response.data.message
              : error.message,
          
          })
     }
  }