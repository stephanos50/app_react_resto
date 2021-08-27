import {
    USER_CITY_REQUEST,
    USER_CITY_SUCCESS,
    USER_CITY_FAIL,
} from '../constants/cityConstant'


export const cityListReducer =  (state = { cities:[] }, action) => {
    switch (action.type) {
        case USER_CITY_REQUEST:
            return { loading: true, cities: []}
        case USER_CITY_SUCCESS:
            return { loading:false, cities: action.payload }
        case USER_CITY_FAIL:
            return { loading:false, error: action.payload}
        default:
            return state
    }
} 