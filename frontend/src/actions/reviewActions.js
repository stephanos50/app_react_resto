import {
    ADMIN_USERSLIST_REQUEST,
    ADMIN_USERSLIST_SUCCESS,
    ADMIN_USERSLIST_FAIL,
    ADMIN_USERREVIEW_REQUEST,
    ADMIN_USERREVIEW_SUCCESS,
    ADMIN_USERREVIEW_FAIL,
    ADMIN_DELETEREVIEW_REQUEST,
    ADMIN_DELETEREVIEW_SUCCESS,
    ADMIN_DELETEREVIEW_FAIL

} from '../constants/reviewContstants'

import axios from 'axios'

export const usersList = () => async (dispatch, getState) => {
 
    try {
      dispatch({ type: ADMIN_USERSLIST_REQUEST })
      
      const { userLogin: { userInfo } } = getState()
  
      const config = { 
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        } 
      }
  
      const { data } = await axios.get(`/api/reviews`, config)
      
      dispatch({
        type: ADMIN_USERSLIST_SUCCESS,
        payload: data,
      })
      
    } catch (error) {
      dispatch({
        type: ADMIN_USERSLIST_FAIL,
        payload: error.response  && error.response.data.message
            ? error.response.data.message
            : error.message,
    })
    }
  }



export const reviewListByUser = (id) => async (dispatch, getState) => {
 
  try {
    dispatch({ type: ADMIN_USERREVIEW_REQUEST })
    
    const { userLogin: { userInfo } } = getState()

    const config = { 
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      } 
    }

    const { data } = await axios.get(`/api/reviews/${id}`, config)
    
    
    
    dispatch({
      type: ADMIN_USERREVIEW_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
    dispatch({
      type: ADMIN_USERREVIEW_FAIL,
      payload: error.response  && error.response.data.message
          ? error.response.data.message
          : error.message,
  })
  }
}



export const deleteReview = (id) => async(dispatch, getState) => {
    
  try {    
      dispatch({ 
          type:ADMIN_DELETEREVIEW_REQUEST,
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
  
      await axios.delete(`/api/reviews/${id}`, config)
  
      dispatch({ 
          type: ADMIN_DELETEREVIEW_SUCCESS,
      })
      
     } catch (error) {
          dispatch({ 
              type: ADMIN_DELETEREVIEW_FAIL,
              payload: error.response  && error.response.data.message
              ? error.response.data.message
              : error.message,
          
          })
     }
  }