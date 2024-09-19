import { useState } from "react";
import { createContext } from "react";
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthorized(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthorized(false);
    toast.success("Logout successful!!");
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthorized, setIsAuthorized, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
