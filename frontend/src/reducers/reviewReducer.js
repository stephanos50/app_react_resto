
import {
  ADMIN_USERSLIST_REQUEST,
  ADMIN_USERSLIST_SUCCESS,
  ADMIN_USERSLIST_FAIL,
  ADMIN_USERREVIEW_REQUEST,
  ADMIN_USERREVIEW_SUCCESS,
  ADMIN_USERREVIEW_FAIL,
  ADMIN_DELETEREVIEW_REQUEST,
  ADMIN_DELETEREVIEW_SUCCESS,
  ADMIN_DELETEREVIEW_FAIL,
  ADMIN_DELETEREVIEW_RESET


} from '../constants/reviewContstants'






export const listusersReducer = ( state = { users: [] }  , action) => {
    switch (action.type) {
      case ADMIN_USERSLIST_REQUEST:
        return { loading: true, users:[]};
      case ADMIN_USERSLIST_SUCCESS:
        return { loading: false, users: action.payload };
      case   ADMIN_USERSLIST_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
      }
};

export const listreviewReducer = ( state = {reviews:[]}  , action) => {
  switch (action.type) {
    case   ADMIN_USERREVIEW_REQUEST:
      return {  loading: true, reviews:[]};
    case ADMIN_USERREVIEW_SUCCESS:
      return { loading: false, reviews: action.payload };
    case   ADMIN_USERREVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
        return state;
    }
};


export const reviewsDeleteReducer = (state= {} , action) => {
  switch (action.type) {
      case ADMIN_DELETEREVIEW_REQUEST:
          return {loading: true}
      case ADMIN_DELETEREVIEW_SUCCESS:
          return {loading: false, success: true}
      case ADMIN_DELETEREVIEW_FAIL:
          return {loading: false, error: action.payload}
      case ADMIN_DELETEREVIEW_RESET:
          return {}
      default:
          return state;
  }

}
  