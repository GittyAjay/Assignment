import axios from 'axios';
import {BASE_URL} from './utils/apiUrl';
import {API_KEY} from '@env';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    sort_by: 'primary_release_year',
    page: 1,
    'vote_count.gte': 100,
  },
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    // console.log('Request Interceptor:', JSON.stringify(config));
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    // console.log('Response Interceptor:', JSON.stringify(response));
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
