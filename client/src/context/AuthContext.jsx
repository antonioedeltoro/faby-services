import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";      // npm i jwt-decode

const TOKEN_KEY      = "authToken";
const IDLE_LIMIT_MIN = 15;

/* helpers */
function tokenIsValid(token) {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
}

function msUntilExp(token) {
  try {
    const { exp } = jwtDecode(token);
    return Math.max(exp * 1000 - Date.now(), 0);
  } catch {
    return 0;
  }
}

/* context */
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    return tokenIsValid(stored) ? stored : null;
  });

  /* keep storage in sync */
  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else       localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  /* logout at token expiry */
  useEffect(() => {
    if (!token) return;
    const id = setTimeout(() => setToken(null), msUntilExp(token));
    return () => clearTimeout(id);
  }, [token]);

  /* idle logout */
  useEffect(() => {
    if (!token) return;
    let idleId;
    const reset = () => {
      clearTimeout(idleId);
      idleId = setTimeout(() => setToken(null), IDLE_LIMIT_MIN * 60 * 1000);
    };
    reset();
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    return () => {
      clearTimeout(idleId);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
    };
  }, [token]);

  const login  = (t) => setToken(tokenIsValid(t) ? t : null);
  const logout = () => setToken(null);
  const isAuthenticated = tokenIsValid(token);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

/* convenience hook (re‑exported by hooks/useAuth.js) */
export function useAuth() {
  return useContext(AuthContext);
}
