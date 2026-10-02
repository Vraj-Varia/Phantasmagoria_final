import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_PASSCODE_KEY = 'phantasmagoria_admin_passcode';
const AUTH_SESSION_KEY = 'phantasmagoria_admin_authenticated';
const DEFAULT_PASSCODE = 'admin123';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [passcode, setPasscode] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_PASSCODE;
    } catch {
      return DEFAULT_PASSCODE;
    }
  });

  const login = (inputPasscode) => {
    if (inputPasscode === passcode || inputPasscode === DEFAULT_PASSCODE) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return { success: true };
    }
    return { success: false, error: 'Incorrect passcode. Default is admin123' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const updatePasscode = (newPasscode) => {
    if (!newPasscode || newPasscode.trim().length < 4) {
      return { success: false, error: 'Passcode must be at least 4 characters.' };
    }
    setPasscode(newPasscode);
    try {
      localStorage.setItem(ADMIN_PASSCODE_KEY, newPasscode);
    } catch (e) {
      console.error(e);
    }
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        updatePasscode,
        defaultPasscode: DEFAULT_PASSCODE
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
