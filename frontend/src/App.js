import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Footer from './component/Footer';
import Login from './authentication/Login';
import Register from './authentication/Register';
import { Toaster } from 'react-hot-toast';
import AuthContext from './context/AuthContext';

import axios from 'axios'; 
import Dashboard from './component/Dashboard';

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(AuthContext);  

  useEffect(() => {
    const fetchUser = async () => {
    
      try {
        const response = await axios.get(
          "http://localhost:8000/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
