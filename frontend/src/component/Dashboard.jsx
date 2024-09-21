import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
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
            {file.name} - <a href={file.path}>Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFiles;
