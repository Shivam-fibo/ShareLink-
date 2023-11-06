import {useRef, useState, useEffect} from 'react'
import './App.css';
import { uploadFile } from './services/api';

function App() {

  const [file, setFile] = useState('')
  const [result, setResult] = useState('')
  const fileInputRef = useRef()




  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
  
        try {
          const response = await uploadFile(data);
          setResult(response.path);
        } catch (error) {
          console.error("Error uploading the file:", error);
          // You can set an error state or display an error message to the user here.
        }
      }
    };
    getImage();
  }, [file]);
  
  
  const onUploadClick = () =>{
    fileInputRef.current.click()
  }

  return (
    <div>
      <button onClick={()=>onUploadClick()}>Upload</button>
      <input type="file"
        ref={fileInputRef}
        style = {{
          display: "none"
        }}
        onChange={(e) => setFile(e.target.files[0])}
      /> 
              <a href={result} target='_blank'>{result}</a> 
    </div>
  );
}

export default App;
