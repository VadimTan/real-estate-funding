import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const backendURL = 'https://backend-link-to';

export const userLogin = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			// // configure header's Content-Type as JSON
			// const config = {
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// };

			// const { data } = await axios.post(
			// 	`${backendURL}/api/user/login`,
			// 	{ email, password },
			// 	config
			// );

			// console.log(email, password);

			const data = {
				userToken:
					'longlongToken2342342ih4i2uh3i4uh2i3u4h2i3uh42iu3h423u42i3h42iu3h42u3h4i2u3h458734yt28437ghoershvarunviusrbv',
				email,
				password,
			};

			console.log(data);
			// store user's token in local storage
			localStorage.setItem('userToken', data.userToken);
			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
