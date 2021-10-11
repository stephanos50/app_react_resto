import {

    ADMIN_USERINVOICESLIST_FAIL,
    ADMIN_USERSINVOICELIST_REQUEST,
    ADMIN_USERINVOICESLIST_SUCCESS,
    
    ADMIN_USERINVOICE_REQUEST,
    ADMIN_USERINVOICE_SUCCESS, 
    ADMIN_USERINVOICE_FAIL,
    

    ADMIN_DELETEINVOICE_REQUEST,
    ADMIN_DELETEINVOICE_SUCCESS, 
    ADMIN_DELETEINVOICE_FAIL 

} from '../constants/invoiceConctants'




export const listinvoicesusersReducer = ( state = { users: [] }  , action) => {
    switch (action.type) {
      case ADMIN_USERSINVOICELIST_REQUEST:
        return { loading: true, users:[]};
      case ADMIN_USERINVOICESLIST_SUCCESS:
        return { loading: false, users: action.payload };
      case ADMIN_USERINVOICESLIST_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
      }
};

export const listordersusersReducer = ( state = { invoices: [] }  , action) => {
  switch (action.type) {
    case ADMIN_USERINVOICE_REQUEST:
      return {  loading: true, invoices: []};
    case ADMIN_USERINVOICE_SUCCESS:
      return { loading: false, invoices: action.payload };
    case ADMIN_USERINVOICE_FAIL:
      return { loading: false, error: action.payload };
    default:
        return state;
    }
};


export const invoiceDeleteReducer = (state= {} , action) => {
  switch (action.type) {
      case ADMIN_DELETEINVOICE_REQUEST:
          return {loading: true}
      case ADMIN_DELETEINVOICE_SUCCESS:
          return {loading: false, success: true}
      case ADMIN_DELETEINVOICE_FAIL:
          return {loading: false, error: action.payload}
      default:
          return state;
  }

}