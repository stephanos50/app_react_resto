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
    ROLE_CREATE_RESET,
} from '../constants/roleConstants'

export const rolesListReducer = (state = { roles: []}, action ) => {
    switch (action.type) {
        case ROLE_LIST_REQUEST:
            return { loading: true, roles:[] }
        case ROLE_LIST_SUCCESS:
            return { loading: false, roles: action.payload }
        case ROLE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}


export const roleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ROLE_CREATE_REQUEST:
            return {loading: true}
        case ROLE_CREATE_SUCCESS:
            return {loading: false, success: true, role: action.payload}
        case ROLE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case ROLE_CREATE_RESET:
            return {}
        default:
            return state;
    }
    
}

export const roleDeleteReducer = (state= {} , action) => {
    switch (action.type) {
        case ROLE_DELETE_REQUEST:
            return {loading: true}
        case ROLE_DELETE_SUCCESS:
            return {loading: false, success: true}
        case ROLE_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }

}


