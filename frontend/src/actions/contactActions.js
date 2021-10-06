import {
    USER_MESSAGE_REQUEST,
    USER_MESSAGE_SUCCESS,
    USER_MESSAGE_FAIL
} from '../constants/contactConstants'
import axios from 'axios'



export const sendMessage = (email, text)=> async(dispatch) => {
   
    try {
        dispatch({
            type: USER_MESSAGE_REQUEST
        })
  
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.post(`api/contact`,{email,text}, config)

       
       
        dispatch({
            type: USER_MESSAGE_SUCCESS,
            payload: data
        })
       
    } catch (error) {
        
        dispatch({
            type: USER_MESSAGE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
  }