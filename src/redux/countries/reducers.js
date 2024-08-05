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

const initialState = {
    loading: false,
    countries: [],
    error: null,
    postSuccess: false,
};

const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRIES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_COUNTRIES_SUCCESS:
            return { ...state, loading: false, countries: action.payload, postSuccess: false };
        case FETCH_COUNTRIES_FAILURE:
            return { ...state, loading: false, error: action.error };
        case POST_COUNTRY_REQUEST:
            return { ...state, loading: true, error: null, postSuccess: false };
        case POST_COUNTRY_SUCCESS:
            // console.log("state.countries", state.countries);
            // console.log("action.payload.data", action.payload.data);
            return {
                ...state,
                countries: {
                    ...state.countries,
                    data: [
                        ...(state.countries.data || []),
                        action.payload.data
                    ],
                },
                loading: false,
                postSuccess: true,
            };
        case POST_COUNTRY_FAILURE:
            return { ...state, loading: false, error: action.error };
        case UPDATE_COUNTRY_REQUEST:
            return { ...state, loading: true, error: null };
            case UPDATE_COUNTRY_SUCCESS:
                return {
                    ...state,
                    countries: {
                        ...state.countries,
                        data: state.countries.data.map(country => 
                            country.id === action.payload.data.id ? action.payload.data : country
                        ),
                    },
                    loading: false,
                    postSuccess: true,
                };
            
        case UPDATE_COUNTRY_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default countriesReducer
