import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../constants/config';
console.log(baseUrl);
export const userLogin = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				`${baseUrl}/login`,
				{
					email,
					password,
				},
				config
			);

			axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

			// store user's token in local storage
			localStorage.setItem('accessToken', data.token);
			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
