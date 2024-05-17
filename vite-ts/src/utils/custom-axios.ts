import axios, { AxiosRequestConfig } from 'axios';

import { CUSTOM_API } from 'src/config-global';

// ----------------------------------------------------------------------


const customAxiosInstance = axios.create({ baseURL: CUSTOM_API });

customAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

customAxiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default customAxiosInstance;

// ----------------------------------------------------------------------


export const customFetcher = async (args: string | [string, AxiosRequestConfig], token?: string) => {
  const [url, config] = Array.isArray(args) ? args : [args, {}];

  const headers = {
    ...config.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await customAxiosInstance.get(url, { ...config, headers });

  console.log('axios', res)

  return res.data;
};


// ----------------------------------------------------------------------

export const endpoints = {
  portfolio: {
    list:'/api/v1/common/portfolio'
  }
};