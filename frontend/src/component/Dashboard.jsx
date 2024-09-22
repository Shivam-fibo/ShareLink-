import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ReactLoading from 'react-loading'; // Import the loading component

const UserFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
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
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchUserFiles();
  }, [user]);

  return (
    <div>
      <h1>User Uploaded Files</h1>

      {loading ? (
        // Use react-loading spinner while loading
        <ReactLoading type="spin" color="#0000ff" height={50} width={50} />
      ) : (
        <ul>
          {files.length > 0 ? (
            files.map((file) => (
              <li key={file._id}>
                {file.name} - <a href={file.path}>{file.path}</a>
              </li>
            ))
          ) : (
            <p>No files found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserFiles;
