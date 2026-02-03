import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,

  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",

  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },

  // forces XSRF header across ports (5173 -> 8000)
  withXSRFToken: true,
});

// fallback for some axios versions
api.interceptors.request.use((config) => {
  const m = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  if (m) config.headers["X-XSRF-TOKEN"] = decodeURIComponent(m[1]);
  return config;
});

export const csrf = () => api.get("/sanctum/csrf-cookie");

export default api;
