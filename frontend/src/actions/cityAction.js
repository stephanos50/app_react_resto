import {
    USER_CITY_REQUEST,
    USER_CITY_FAIL,
    USER_CITY_SUCCESS,
} from '../constants/cityConstant'
import axios from 'axios'

export const listCities = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_CITY_REQUEST})

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } =  await axios.get('/api/cities', config)
        
        dispatch({
            type: USER_CITY_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: USER_CITY_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
        
    }
  
}