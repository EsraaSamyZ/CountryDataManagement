import axiosInstance from '../../api/axiosInstance';
import {
  FETCH_REGIONS_REQUEST,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
  POST_REGION_REQUEST,
  POST_REGION_SUCCESS,
  POST_REGION_FAILURE
} from './actionTypes';

export const fetchRegions = (id) => async (dispatch) => {
  dispatch({ type: FETCH_REGIONS_REQUEST });
  try {
    const response = await axiosInstance.get(`/geo/regions?nationality_id=${id}`);
    dispatch({ type: FETCH_REGIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_REGIONS_FAILURE, error: error.message });
  }
};

export const postRegion = (regionData) => async (dispatch) => {
  dispatch({ type: POST_REGION_REQUEST });
  try {
    const response = await axiosInstance.post(`/management/geo/regions`, regionData);
    console.log(response)
    dispatch({ type: POST_REGION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_REGION_FAILURE, error: error.message });
  }
};
