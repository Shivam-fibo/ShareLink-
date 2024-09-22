import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const UserFiles = () => {
  const [files, setFiles] = useState([]);
  const {  user } = useContext(AuthContext);


  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        if(!user){
            toast.error('Please login or register before uploading');
            return;
        }
        const response = await axios.get('http://localhost:8000/user/files', { withCredentials: true }); 
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchUserFiles();
  }, []);

  return (
    <div>
      <h1>User Uploaded Files</h1>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            {file.name} - <a href={file.path}>{file.path}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFiles;
