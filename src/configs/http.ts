import axios from 'axios';

const http = axios.create({
  baseURL: 'https://kdmhfitqexcrrriwmwrj.functions.supabase.co',
});

http.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

    if (token) {
      config.headers.Authorization =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbWhmaXRxZXhjcnJyaXdtd3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYzMTExMjMsImV4cCI6MTk5MTg4NzEyM30.s1-KhkkRAhF2tcl7dQ2Upj95kMoP1W6OE4g0JoM8SPU';
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
