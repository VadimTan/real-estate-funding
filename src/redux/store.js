import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import searchSlice from './search.slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		search: searchSlice,
	},
});

export default store;
