import axios from 'axios';

const http = axios.create({
  baseURL: 'https://kdmhfitqexcrrriwmwrj.functions.supabase.co',
});

http.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.platform = 'emergency_relief';
    config.headers['api-key'] = process.env.NEXT_PUBLIC_API_KEY;

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
