import {
    USER_MESSAGE_REQUEST,
    USER_MESSAGE_SUCCESS,
    USER_MESSAGE_FAIL
} from '../constants/contactConstants'


export const messageContactReducer = (state = {}, action) => {
    switch(action.type){
        case USER_MESSAGE_REQUEST:
            return {loading: true, }
        case USER_MESSAGE_SUCCESS: 
            return {loading: false, success: action.payload}
        case USER_MESSAGE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}