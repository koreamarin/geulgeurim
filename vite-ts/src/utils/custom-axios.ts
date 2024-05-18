import axios, { AxiosRequestConfig } from 'axios';

import { CUSTOM_API } from 'src/config-global';

// ----------------------------------------------------------------------

const customAxiosInstance = axios.create({ baseURL: CUSTOM_API });

customAxiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);


customAxiosInstance.interceptors.response.use(
  (res) => res,
  (error) => console.log('에러코드', error.response.status)
);

export default customAxiosInstance;

// ----------------------------------------------------------------------

export const customFetcher = async (args: string | [string, AxiosRequestConfig]) => {

    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await customAxiosInstance.get(url, { ...config });

    return res.data;

  // console.log('axios', res)

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  resume:{
    list:'/api/v1/recruit/resume',
  },
  portfolio: {
    list:'/api/v1/common/portfolio',
    detail: '/api/v1/common/portfolio/detail',
    detailUserFormat: '/api/v1/common/portfolio/detail/user'
  }
};