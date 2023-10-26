import axios from "axios";
import baseUrl from "./constants/config";

const instance = axios.create({
  baseURL: baseUrl,
  // Other configuration options if needed
});

// Add a request interceptor to include the Bearer token
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from local storage
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to check for 401 error and remove the token
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error here
      // You can remove the token from local storage
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);

export default instance;
