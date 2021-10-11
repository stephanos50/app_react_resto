import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_REQUEST,
    USER_DELETE_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DETAILS_RESET,
  
  

} from '../constants/adminConstants'

import axios from 'axios'


export const listUsers = () => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST })
      
      const { userLogin: { userInfo } } = getState()
  
      const config = { 
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        } 
      }
  
      const { data } = await axios.get(`/api/admin`, config)
      
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })
      
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload: error.response  && error.response.data.message
            ? error.response.data.message
            : error.message,
    })
    }
  }



export const deleteUser = (email) => async (dispatch, getState) => {
 
  try {
    dispatch({ type: USER_DELETE_REQUEST })
    
    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/admin/${email}`, config)
    
    dispatch({ type: USER_DELETE_SUCCESS })
    
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response  && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    
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
      const { data } = await axios.get(`/api/admin/${id}`, config)

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload:data
      })

      dispatch({ type: USER_DETAILS_RESET })
    
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response  && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
      
    }
 
}


export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
    const { data } = await axios.put(`/api/admin/${user.email}`,user, config)
    
    dispatch({
      type: USER_UPDATE_SUCCESS,
    })

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response  && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

