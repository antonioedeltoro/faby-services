// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem('authToken') || null
  );

  /*  1️⃣  Immediate, synchronous write  */
  const login = (newToken) => {
    setToken(newToken);                       // React state
    localStorage.setItem('authToken', newToken); // persist right now
  };

  /*  2️⃣  Immediate, synchronous clear   */
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  /*  3️⃣  Keep state ↔ storage in sync if token changes some other way */
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
