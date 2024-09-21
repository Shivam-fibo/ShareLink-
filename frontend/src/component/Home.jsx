import { useContext, useEffect, useRef, useState } from 'react';
import { uploadFile } from '../services/api';
import Wave from 'react-wavify';
import toast from 'react-hot-toast';
import '../App.css';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthorized, user } = useContext(AuthContext)
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const fileRef = useRef();

  const onUploadClick = () => {
    if (!user) {
      toast.error('Please login or register before uploading');
      return;
    }
    fileRef.current.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied!!");
  };

  useEffect(() => {
    const getImage = async () => {
      if (file && user) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        data.append("userId", user._id);
        let response = await uploadFile(data);
        console.log(response);
        console.log(user);
        setResult(response.path);
      }
    };
    getImage();
  }, [file,user]);

  return (
    <>
      <div className="flex flex-col items-center p-6 md:flex-row justify-between">
        <div className="max-w-md w-full text-center md:text-left">
          <h2 className="text-4xl font-semibold text-gray-300">ShareLink</h2>
          <p className="text-xl text-gray-400 mb-4">File sharing application</p>
          
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={onUploadClick}
          >
            Upload
          </button>
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          {result && user &&  (
            <div className="mt-4 flex flex-col items-center md:flex-row">
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {result}
              </a>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0 md:ml-4"
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 md:mt-0">
          <img src="/hero.jpg" alt="Hero" className="w-full rounded-lg" />
        </div>
      </div>

    
      <Wave
        fill="#21e909"
        paused={false}
        options={{ height: 16, amplitude: 25, speed: 0.15, points: 10 }}
      />
    </>
  );
};

export default Home;
