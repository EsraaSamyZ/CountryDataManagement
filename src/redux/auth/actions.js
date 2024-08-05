import axiosInstance from '../../api/axiosInstance';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from './actionTypes';

export const loginUser = ({ email, password }) => async (dispatch) => {
    const credentials = { email, password };
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LOGIN_USER_FAILURE, error: error.message });
    }
};
