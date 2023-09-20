import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load authentication state from local storage on component mount
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isLoggedIn');
    if (storedAuthState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    // Implement your login logic here and set isLoggedIn to true on successful login.
    setIsLoggedIn(true);
    // Save the authentication state to local storage
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    // Implement your logout logic here and set isLoggedIn to false on logout.
    setIsLoggedIn(false);
    // Remove the authentication state from local storage
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
