import axiosInstance from '../../api/axiosInstance';
import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  POST_COUNTRY_REQUEST,
  POST_COUNTRY_SUCCESS,
  POST_COUNTRY_FAILURE,
  UPDATE_COUNTRY_REQUEST,
  UPDATE_COUNTRY_SUCCESS,
  UPDATE_COUNTRY_FAILURE
} from './actionTypes';

export const fetchCountries = (endpoint) => async (dispatch) => {
  dispatch({ type: FETCH_COUNTRIES_REQUEST });
  try {
    const response = await axiosInstance.get(`/management/geo/nationalities?page=${endpoint}`);
    dispatch({ type: FETCH_COUNTRIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_COUNTRIES_FAILURE, error: error.message });
  }
};

export const postCountry = (countryData) => async (dispatch) => {
  dispatch({ type: POST_COUNTRY_REQUEST });
  try {
    const response = await axiosInstance.post(`/management/geo/nationalities`, countryData);
    dispatch({ type: POST_COUNTRY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_COUNTRY_FAILURE, error: error.response.data.message });
  }
};

export const updateCountry = (countryData, id) => async (dispatch) => {
  dispatch({ type: UPDATE_COUNTRY_REQUEST });
  try {
    const response = await axiosInstance.put(`/management/geo/nationalities/${id}`, countryData);
    dispatch({ type: UPDATE_COUNTRY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_COUNTRY_FAILURE, error: error.response.data.message });
  }
};
