import axios from "axios";
const TOKEN_KEY = "token";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function initAxiosInterceptors() {
  axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  axios.interceptors.response.use(
    (response) => response,

    (err) => {
      if (err) {
        return;
      } else {
        return Promise.refect(err);
      }
    }
  );
}
