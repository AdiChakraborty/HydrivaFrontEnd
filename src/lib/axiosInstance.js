import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem("supabase.auth.token");

    config.headers = config.headers || {};

    if (session) {
      // Assuming the token is stored as a JSON string, we need to parse it
      const parsedSession = JSON.parse(session);

      config.headers.Authorization = `Bearer ${parsedSession.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
