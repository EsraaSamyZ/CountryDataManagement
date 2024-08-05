import {
    FETCH_REGIONS_REQUEST,
    FETCH_REGIONS_SUCCESS,
    FETCH_REGIONS_FAILURE,
    POST_REGION_REQUEST,
    POST_REGION_SUCCESS,
    POST_REGION_FAILURE
} from './actionTypes';

const initialState = {
    loading: false,
    regions: [],
    error: null,
    postSuccess: false,
};

const regionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REGIONS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_REGIONS_SUCCESS:
            return { ...state, loading: false, regions: action.payload, postSuccess: false };
        case FETCH_REGIONS_FAILURE:
            return { ...state, loading: false, error: action.error };
        case POST_REGION_REQUEST:
            return { ...state, loading: true, error: null, postSuccess: false };
            case POST_REGION_SUCCESS:
                // console.log("state.countries", state.countries);
                // console.log("action.payload.data", action.payload.data);
                return {
                    ...state,
                    regions: {
                        ...state.regions,
                        data: [
                            ...(state.regions.data || []),
                            action.payload.data
                        ],
                    },
                    loading: false,
                    postSuccess: true,
                };
        case POST_REGION_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default regionsReducer
