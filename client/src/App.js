import { useState, useEffect, useRef } from "react";
import "./App.css";
import { uploadFile } from "./service/api";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <div className="app-info">
        <h1>
          <span className="app-name">Velocity Drop</span>
        </h1>
        <p>
          This is a simple file sharing application where you can upload files
          and share the download link.
        </p>
      </div>
      <div className="wrapper">
        <h2>Upload Your File</h2>
        <p>
          Click the button below to select a file from your device and start
          uploading.
        </p>
        <button className="upload-btn" onClick={() => onUploadClick()}>
          Upload File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {result && (
          <div className="link-container">
            <h2>Download Link</h2>
            <p>
              Your file has been successfully uploaded. Click the link below to
              download:
            </p>
            <a href={result} target="_blank">
              {result}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;