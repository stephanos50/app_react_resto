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
    ALLERGEN_CREATE_RESET,
} from '../constants/allergenConstant'

export const allergenListReducer = (state = { allergens: []}, action ) => {
    switch (action.type) {
        case ALLERGEN_LIST_REQUEST:
            return { loading: true, allergens:[] }
        case ALLERGEN_LIST_SUCCESS:
            return { loading: false, allergens: action.payload }
        case ALLERGEN_LIST_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}


export const allergenCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ALLERGEN_CREATE_REQUEST:
            return {loading: true}
        case ALLERGEN_CREATE_SUCCESS:
            return {loading: false, success: true, allergen: action.payload}
        case ALLERGEN_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case ALLERGEN_CREATE_RESET:
            return {}
        default:
            return state;
    }
    
}

export const allergenDeleteReducer = (state= {} , action) => {
    switch (action.type) {
        case ALLERGEN_DELETE_REQUEST:
            return {loading: true}
        case ALLERGEN_DELETE_SUCCESS:
            return {loading: false, success: true}
        case ALLERGEN_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }

}


