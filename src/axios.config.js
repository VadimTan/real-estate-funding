import axios from 'axios';
import baseUrl from './constants/config';

const instance = axios.create({
	baseURL: baseUrl,
	// Other configuration options if needed
});

// Add a request interceptor to include the Bearer token
instance.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('accessToken'); // Retrieve the token from local storage
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default instance;
