import {
    FACTURES_LIST_REQUEST,
    FACTURES_LIST_SUCCESS,
    FACTURES_LIST_FAIL,
} from '../constants/factureConstants'


export const listFactureReducer = (state = {invoices:[]} , action) => {
    switch(action.type) {
        case FACTURES_LIST_REQUEST:
            return { loading: true, invoices:[] };
        case FACTURES_LIST_SUCCESS:
            return { loading: false, invoices: action.payload };
        case FACTURES_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }

}