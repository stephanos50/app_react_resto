import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
  
    
} from '../constants/categoryConstants'
import axios from 'axios'


export const listCategory = () => async(dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST})

        const { data } = await axios.get('/api/categories')

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const createCategory = (category) => async (dispatch, getState) => {
   try {    
    dispatch({ type:CATEGORY_CREATE_REQUEST})

    const { 
        userLogin : { userInfo },
    } = getState()
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    await axios.post(`/api/categories/${category}`,{}, config)
    
   
    dispatch({ 
        type: CATEGORY_CREATE_SUCCESS,
        
    })
    
   } catch (error) {
        dispatch({ 
            type: CATEGORY_CREATE_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
   }
}




export const deleteCategory = (id) => async(dispatch, getState) => {
    
    try {    
        dispatch({ 
            type:CATEGORY_DELETE_REQUEST,
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
    
        await axios.delete(`/api/categories/${id}`, config)
    
        dispatch({ 
            type: CATEGORY_DELETE_SUCCESS,
        })
        
       } catch (error) {
            dispatch({ 
                type: CATEGORY_DELETE_FAIL,
                payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
            
            })
       }
    }
   
