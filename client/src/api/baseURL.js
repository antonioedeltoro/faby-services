// client/src/api/baseURL.js
export const API = import.meta.env.VITE_API_URL;

if (!API) {
  throw new Error(
    "VITE_API_URL is not defined – check Render “Environment” tab."
  );
}
