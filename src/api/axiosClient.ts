import axios from "axios";

//im not setting header Content-Type to application/json because axios sets it automatically, so if i want to send files via those axios clients i should not manually set it to any value
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const protectedApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

//add auth header to protectedApi
protectedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//update access token when it expires
protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error is due to token expiration and we haven't already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await api.post("/api/token/refresh/", {
            refresh: refreshToken,
          });
          const { access } = response.data;

          // Store new access token and retry the original request
          localStorage.setItem("accessToken", access);
          protectedApi.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access}`;
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return protectedApi(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect to login if refresh fails
      }
    }
    return Promise.reject(error);
  }
);

export { api, protectedApi };
