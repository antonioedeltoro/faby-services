// client/src/api/client.js
// Single source of truth for API calls. Two axios instances share the same
// absolute base URL (client and API are separate origins in production) but
// carry different auth tokens for the two independent auth systems.
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

if (!API) {
  throw new Error(
    "VITE_API_URL is not defined – check Render “Environment” tab."
  );
}

const baseURL = `${API}/api`;

/** Attach the token stored under `tokenKey` (if any) to every request. */
function withToken(instance, tokenKey) {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return instance;
}

/** Admin dashboard + public news calls (sends the admin token when present). */
export const api = withToken(axios.create({ baseURL }), "authToken");

/** Reviews-page calls (sends the reviews-user token when present). */
export const reviewsApi = withToken(
  axios.create({ baseURL }),
  "reviews_user_token"
);

export default api;
