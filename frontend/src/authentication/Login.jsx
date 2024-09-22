import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/login', 
      { email, password }, 
      {
        withCredentials: true,  
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
      console.log(res);
      login(res.data.user);
      toast.success('Login successful!!');
      navigate('/');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
        
          toast.error('Invalid email or password !!');
        } else if (err.response.data.msg) {
        
          toast.error(err.response.data.msg);
        } else {
         
          toast.error('An unexpected error occurred');
        }
      } else {
       
        toast.error('Server not reachable');
      }
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mx-12 my-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleLogin}>
              {/* Email input */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-2  py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Password input */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-2 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
