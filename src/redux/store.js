import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducers';
import countriesReducer from './countries/reducers';
import regionsReducer from './regions/reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
    regions: regionsReducer,
  },
});

export default store;
