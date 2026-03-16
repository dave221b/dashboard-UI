import axios from "axios";
import { useAuthStore } from "../hooks/useAuthStore";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});


api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use((response) => response,
async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem("refreshToken");
    if(!refreshToken) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }
    try {
      const response = await api.post("/auth/refresh", { refreshToken });
      const {accessToken, refreshToken: newRefreshToken} = response.data;
      useAuthStore.getState().setAccessToken(accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      console.error("Refresh token error:", refreshError);
      useAuthStore.getState().logout();
    }
  }
  return Promise.reject(error);
});