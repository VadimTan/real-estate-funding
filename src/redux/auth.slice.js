import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './auth.actions';

// initialize userToken from local storage
const accessToken = localStorage.getItem('accessToken')
	? localStorage.getItem('accessToken')
	: null;

const initialState = {
	loading: false,
	isLoggedIn: !!accessToken,
	userInfo: null,
	properties: [],
	accessToken,
	error: null,
	success: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.userInfo = null;
			state.accessToken = null;
			state.isLoggedIn = false;
			localStorage.removeItem('accessToken');
		},
	},

	extraReducers: {
		[userLogin.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[userLogin.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.isLoggedIn = true;
			state.userInfo = payload.user;
			state.accessToken = payload.accessToken;
			state.success = true;
		},
		[userLogin.rejected]: (state, { payload }) => {
			state.loading = false;
			state.isLoggedIn = false;
			state.error = payload;
		},
		// register user reducer...
	},
});

export const { logout, setData, filterProperties } = authSlice.actions;
export default authSlice.reducer;
