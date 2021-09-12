import {
    ALLERGEN_LIST_REQUEST,
    ALLERGEN_LIST_SUCCESS,
    ALLERGEN_LIST_FAIL,
    ALLERGEN_CREATE_REQUEST,
    ALLERGEN_CREATE_SUCCESS,
    ALLERGEN_CREATE_FAIL,
    ALLERGEN_DELETE_REQUEST,
    ALLERGEN_DELETE_SUCCESS,
    ALLERGEN_DELETE_FAIL,
} from '../constants/allergenConstant'
import axios from 'axios'


export const listAllergen = () => async(dispatch, getState) => {
    try {
        dispatch({ type: ALLERGEN_LIST_REQUEST})

        const { userLogin: {userInfo} } = getState() 
    
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
    
        const { data } = await axios.get('/api/allergens', config)
        

        dispatch({
            type: ALLERGEN_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALLERGEN_LIST_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const createAllergen = (allergen) => async (dispatch, getState) => {
   try {    
    dispatch({ type:ALLERGEN_CREATE_REQUEST})

    const { 
        userLogin : { userInfo },
    } = getState()
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    await axios.post(`/api/allergens/${allergen}`,{}, config)
    
   
    dispatch({ 
        type: ALLERGEN_CREATE_SUCCESS,
        
    })
    
   } catch (error) {
        dispatch({ 
            type: ALLERGEN_CREATE_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
   }
}




export const deleteAllergen = (id) => async(dispatch, getState) => {
    
    try {    
        dispatch({ 
            type:ALLERGEN_DELETE_REQUEST,
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
    
        await axios.delete(`/api/allergens/${id}`, config)
    
        dispatch({ 
            type: ALLERGEN_DELETE_SUCCESS,
        })
        
       } catch (error) {
            dispatch({ 
                type: ALLERGEN_DELETE_FAIL,
                payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
            
            })
       }
    }
   
