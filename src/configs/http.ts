import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    if (!error) {
      return Promise.resolve();
    }

    return Promise.reject(error);
  },
);

export default http;
