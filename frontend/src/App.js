import logo from './logo.svg';
import { useEffect, useRef, useState } from 'react'
import './App.css';
import {uploadFile} from './services/api'

function App() {

  const [file, setFile] = useState("");
  const [result, setResult] = useState("")

  const fileRef = useRef();

  const onUploadClick = () => {
    fileRef.current.click();
  }

  useEffect(() =>{
    const getImage = async () =>{
 
      if(file){
        const data = new FormData()
        data.append("name", file.name)
        data.append("file", file)

        let response = await uploadFile(data)
        setResult(response.path);
      }
    }
    getImage();
    }, [file])
  console.log(file)

  return (
    <div className="App">
      <div className="wrapper">
        <h1>File sharing application</h1>
        <p>Upload and shared the link</p>

        <button onClick={() => onUploadClick()}>Upload</button>
        <input type="file"
          ref={fileRef}
          style={{ "display": "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <a href={result}>{result}</a>
    </div>
  );
}

export default App;
