import { useContext, useEffect, useRef, useState } from 'react';
import { uploadFile } from '../services/api';
import Wave from 'react-wavify';
import toast from 'react-hot-toast';
import '../App.css';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const {  user } = useContext(AuthContext)
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
        console.log(response)
        setResult(response);
      }
    };
    getImage();
  }, [file,user]);

  return (
    <>
    <div className="flex flex-col items-center justify-between h-screen bg-green-100 overflow-hidden md:flex-row">
      {/* Left Section */}
      <div className="w-full max-w-md  ml-12 text-center md:text-left">
      <h2 className="text-7xl font-bold text-blue-700">ShareLink</h2>
        <p className="text-2xl text-black mb-4">
          Seamlessly share your files with others. <br />
          Upload any file and get a unique shareable link instantly. <br />
        </p>

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
  
        {result && user && (
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
  
      {/* Right Section: Hero Image */}
      <div className="w-full mt-6 md:mt-0 md:w-1/2">
        <img src="/hero.png" alt="Hero" className="w-full max-w-lg mx-auto rounded-lg" />
      </div>
    </div>
  </>
  
  );
};

export default Home;
