import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const getUserData = (): string | null => {
  return localStorage.getItem("userData");
};

const AUTH_AXIOS: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_JSEARCH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AUTH_AXIOS.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const data = getUserData();
    // config.headers = config.headers || {};
    if (data) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(data).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AUTH_AXIOS;
