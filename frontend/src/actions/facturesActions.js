
import axios from 'axios'
import {
    FACTURES_LIST_REQUEST,
    FACTURES_LIST_SUCCESS,
    FACTURES_LIST_FAIL,
} from '../constants/factureConstants'

export const facturesList = () => async (dispatch, getState) => {
    try {
        dispatch({type: FACTURES_LIST_REQUEST })
        const { 
            userLogin : {userInfo},
       } = getState()

       const config = {
           headers: {
               Authorization: `Bearer ${userInfo.token}`,
           },
       } 
        
        const { data } = await axios.get('/api/factures', config)
        
        dispatch({ 
            type: FACTURES_LIST_SUCCESS,
            payload: data,
        })
       
    } catch (error) {
        
        dispatch({
            type: FACTURES_LIST_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }

}