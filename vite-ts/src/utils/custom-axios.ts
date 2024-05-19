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

};

// ----------------------------------------------------------------------

export const endpoints = {
  resume: {
    list: '/api/v1/recruit/resume'
  },
  portfolio: {
    list: '/api/v1/common/portfolio',
    create: '/api/v1/common/portfolio',
    createUser: '/api/v1/common/portfolio/user',
    detail: '/api/v1/common/portfolio/detail',
    detailUserFormat: '/api/v1/common/portfolio/detail/user',
    delete: '/api/v1/common/portfolio'
  },
  pieces: {
    mine: '/api/v1/common/piece/search?',
    detail: '/api/v1/common/piece/detail',
    create: '/api/v1/common/piece/create',
    delete: '/api/v1/common/piece/del'
  },
  recruit: {
    list: '/api/v1/recruit/joblist',
    stars: '/api/v1/recruit/star',
    detail: '/api/v1/recruit/jobdetail',
    submit: '/api/v1/recruit/job',
    apply: '/api/v1/recruit/job/myapply'
  },
  user: {
    detail: '/api/v1/auth/user'
  },
  company: {
    info: '/api/v1/auth/enteruser',
    myRecruit: '/api/v1/recruit/job/myjob',
    submittList: '/api/v1/recruit/job'
  }
};
