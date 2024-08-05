import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from './actionTypes';

const accessToken = localStorage.getItem('accessToken') || null;

const initialState = {
  loading: false,
  accessToken,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.data.accessToken,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    default:
      return state;
  }
};

export default authReducer;
