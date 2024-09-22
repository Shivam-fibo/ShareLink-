import { useState, useEffect } from "react";
import { createContext } from "react";
import toast from 'react-hot-toast';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const login = (userData) => {
    setUser(userData);

    setIsAuthorized(true);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/logout', {}, {
        withCredentials: true 
      });
      setUser(null);
      setIsAuthorized(false);
      toast.success("Logout successful!!");
    } catch (err) {
      toast.error('Error while logging out');
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthorized, setIsAuthorized, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
