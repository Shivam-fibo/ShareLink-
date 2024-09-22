import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ReactLoading from 'react-loading';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        if (!user) {
          toast.error('Please login or register before uploading');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/user/files', { withCredentials: true });
        setFiles(response.data);
        console.log(files)
        setLoading(false); 
     
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false); 
      }
    };

    fetchUserFiles();
  }, [user]);






  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">{user.name} Uploaded Files</h1>

      {loading ? (
      
        <div className="flex justify-center items-center">
          <ReactLoading type="balls" color="#1D4ED8" height={64} width={64} />
        </div>
      ) : (
        
        <ul className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
              <h3>File Name</h3>
              <h3>Clicks</h3>
            </li>
          {files.length > 0 ? (
            [...files].reverse().map((file) => (
              <li key={file._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
                <span className="text-gray-800 font-medium">{file.name}</span>
                <button className="text-blue-500 hover:text-blue-700 transition">{file.downloadContent}</button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No files found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dashboard 
