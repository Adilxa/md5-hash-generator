import CryptoJS from "crypto-js";
import { useState } from "react";
import "./App.scss";

const App = () => {

  const [data, setData] = useState("");
  
  const onSave = (data) => {
    const hash = CryptoJS.MD5(data).toString();
    setData(hash);
  };

  const [text, setText] = useState("");
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setText(event.target.result);
    };
    reader.readAsText(file);
  }

  return (
    <div className="main">
      <div className="window">
        <input type="file" onChange={handleFileUpload} />
        <h1>md5: {data}</h1>
        <h1>Text in file: {text}</h1>
        <button onClick={() => onSave(text)}>Convert to md5</button>
      </div>
    </div>
  );
};

export default App;
