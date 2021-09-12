import {
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_CREATE_REQUEST,
    ROLE_CREATE_SUCCESS,
    ROLE_CREATE_FAIL,
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_FAIL,
} from '../constants/roleConstants'
import axios from 'axios'


export const listRoles = () => async(dispatch, getState) => {
    try {
        dispatch({ type: ROLE_LIST_REQUEST})

        const { userLogin: {userInfo} } = getState() 
    
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
    
        const { data } = await axios.get('/api/roles', config)
       
        dispatch({
            type: ROLE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ROLE_LIST_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const createRole = (role) => async (dispatch, getState) => {
   try {    
    dispatch({ type:ROLE_CREATE_REQUEST})

    const { 
        userLogin : { userInfo },
    } = getState()
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    await axios.post(`/api/roles/${role}`,{}, config)
    
    dispatch({ 
        type: ROLE_CREATE_SUCCESS,
        
    })
    
   } catch (error) {
        dispatch({ 
            type: ROLE_CREATE_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
   }
}




export const deleteRole = (id) => async(dispatch, getState) => {
   
    try {    
        dispatch({ 
            type:ROLE_DELETE_REQUEST,
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
    
        await axios.delete(`/api/roles/${id}`, config)
    
        dispatch({ 
            type: ROLE_DELETE_SUCCESS,
        })
        
       } catch (error) {
            dispatch({ 
                type: ROLE_DELETE_FAIL,
                payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
            
            })
       }
    }
   
