import { ACCESS_TOKEN_KEY } from "../constants";

export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const setToken = (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const isAuthenticated = () => !!getToken();

// export const login = () => {
//   const redirectUri = encodeURIComponent(window.location.origin + "/callback");
//   window.location.href = `https://your-auth-server/auth?redirect_uri=${redirectUri}`;
// };

// export const logout = () => {
//   removeToken();
//   window.location.href = `https://your-auth-server/logout?redirect_uri=${window.location.origin}`;
// };
