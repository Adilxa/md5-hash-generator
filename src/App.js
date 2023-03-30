import CryptoJS from "crypto-js";
import { useState, useEffect } from "react";
import "./App.scss";

const App = () => {
	const [prvData, setPrvData] = useState("");
	const [data, setData] = useState(""); // is for md5
	const [text, setText] = useState(); // is for the text
	const [textArea, setTextArea] = useState();
	const [isHovering, setIsHovering] = useState(false);
	const [bitCount, setBitCount] = useState(0);

	// TODO: when the program is running, it should be possible to view and change
	// the message read from the file and the calculated value of the hash function.

	const handleInputChange = (event) => {
    setBitCount(countDifferentBits(data, prvData));
		setTextArea(event.target.value);
		setText(event.target.value);
	};

	//DONE;

	// TODO: for a bit that will change, the application must allow you to set its position (number) in the message; -- rami


  
	// TODO: after each round (iteration of the loop) calculation of the hash function, the application must be able
	// to count the number of bits that have changed in the hash when one bit is changed -- rami
	useEffect(() => {
		setPrvData(data); // Store the previous hash value.
		onSave(text);
	}, [text]);

  function countDifferentBits(prevHash, newHash) {
    const prevBinary = hexToBinary(prevHash);
    const newBinary = hexToBinary(newHash);
    let count = 0;
    for (let i = 0; i < prevBinary.length; i++) {
      if (prevBinary[i] !== newBinary[i]) {
        count++;
      }
    }
    return count;
  }
  
  function hexToBinary(hex) {
    const hexStr = hex.toString();
    let binStr = "";
    for (let i = 0; i < hexStr.length; i += 2) {
      const hexByte = hexStr.substr(i, 2);
      const byte = parseInt(hexByte, 16);
      binStr += byte.toString(2).padStart(8, "0");
    }
    return binStr;
  }

	// Done; 

  
	const onSave = (data) => {
		const hash = CryptoJS.MD5(data).toString();
		setData(hash);
	};

	function handleFileUpload(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = function (event) {
			setText(event.target.result);
		};
		reader.readAsText(file);
	};


  

  console.log(text, "---------", textArea);

	return (
		<div className="main">
			<div className="window">
				<input type="file" onChange={handleFileUpload} />
				<h1>md5: {data}</h1>
				<div className="textarea-container">
					<textarea value={text} onChange={handleInputChange} />
          {bitCount > 0 && <p>Number of changed bits: {bitCount}</p>}
				</div>

				{/* <h2>{splited}</h2> */}
				<button
					onMouseLeave={() => setIsHovering(false)}
					onMouseEnter={() => setIsHovering(true)}>
					{isHovering
						? "Well! i'm useless, we do auto generating rn"
						: "Convert to md5"}
				</button>
        
			</div>
		</div>
	);
};

export default App;
