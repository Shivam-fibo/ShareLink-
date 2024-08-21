import { useEffect, useRef, useState } from 'react'
import { uploadFile } from '../services/api';
import Wave from 'react-wavify'
import toast from 'react-hot-toast';
import '../App.css'
const Home = () => {
  
  const [file, setFile] = useState("");
  const [result, setResult] = useState("")

  const fileRef = useRef();

  const onUploadClick = () => {
    fileRef.current.click();
  }
  function handleCopy() {
    navigator.clipboard.writeText(result)
      toast.success("Copied!!")

  }

  useEffect(() =>{
    const getImage = async () =>{
 
      if(file){
        const data = new FormData()
        data.append("name", file.name)
        data.append("file", file)

        let response = await uploadFile(data)
        console.log(response)
        setResult(response.path);
      }
    }
    getImage();
    }, [file])
  console.log(file)

  return (
    <>
    <div className="container">

    <div className="App">
     

        <h2>ShareLink</h2>
        <p>File sharing application</p>
      

        <button onClick={() => onUploadClick()}>Upload</button>
        <input type="file"
          ref={fileRef}
          style={{ "display": "none" }}
          onChange={(e) => setFile(e.target.files[0])}
          />


  {result && (
    <div className="result">
                <span className="resultUrl">

                <a href={result}  target="_blank" rel="noopener noreferrer">{result}</a>
                </span>
                <button onClick={handleCopy} style={{ marginTop: "10px", marginLeft : "10px" }}>Copy</button>
              </div>
            )}
    </div>
    <div className="share">
      <img src="/hero.jpg" alt="" />
    </div>
   
    </div>
    <Wave fill='#21e909'
        paused={false}
        options={{
          height: 16,
          amplitude: 25,
          speed: 0.15,
          points: 10
        }}
        />
 
        </>
  )
}   

       
export default Home