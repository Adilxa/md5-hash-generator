import CryptoJS from "crypto-js";
import { useState, useEffect } from "react";
import "./App.scss";
import MyChart from "./MyChart";

const App = () => {
	const [prvData, setPrvData] = useState("00000000000000000000000000000000"); // prev data
	const [prvArr, setPrvArr] = useState([]);
	const [data, setData] = useState("00000000000000000000000000000000"); // is for md5
	const [Arr, setArr] = useState([]); // the Arr for the graph and bit count.
	const [text, setText] = useState(); // is for the text
	const [textArea, setTextArea] = useState();
	const [isHovering, setIsHovering] = useState(false);
	const [bitCount, setBitCount] = useState([]);

	useEffect(() => {
		onSave(text);
		// console.log(data, "----", prvData);
	});

	async function countArr(hash, sums, handeler) {
		sums = [];
		for (let i = 0; i < 8; i++) {
			let sum = 0;
			for (let j = 0; j < 4; j++) {
				sum += parseInt(hash[i * 4 + j], 16);
			}
			sums.push(sum);
		}
		await handeler(sums);
	}
	// console.log(prvArr, "---------", Arr);
	async function handleInputChange(event) {
		setPrvData(data); // Store the previous hash value.
		setTextArea(event.target.value);
		setText(event.target.value);

		await countArr(prvData, prvArr, setPrvArr);
		await countArr(data, Arr, setArr);
		countDifferentBits(Arr, prvArr);
	}

	function countDifferentBits(arr1, arr2) {
		const differencesInBits = [];
		for (let i = 0; i < arr1.length; i++) {
			differencesInBits.push(Math.abs(arr1[i] - arr2[i]));
		}
		setBitCount(differencesInBits);
	}

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

		countArr(prvData, prvArr, setPrvArr);
		countArr(data, Arr, setArr);
		countDifferentBits(Arr, prvArr);
	}

	function downloadTextFile(text) {
		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "my-text-file.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	// console.log(text, "---------", textArea);

	return (
		<div className="main">
			<div className="window">
				<input type="file" onChange={handleFileUpload} />
				<h1>md5: {data}</h1>
				<div className="textarea-container">
					<textarea value={text} onChange={handleInputChange} />
					{<p>Number of changed bits :{bitCount.join(" - ")}</p>}
				</div>
				<button
					onClick={() => {
						downloadTextFile(data);
					}}
					onMouseLeave={() => setIsHovering(false)}
					onMouseEnter={() => setIsHovering(true)}>
					{isHovering
						? "Sava the Hash"
						: "Convert to md5"}
				</button>
			</div>
			<div className="Chart">
				<MyChart hash={data} Arr={Arr} />
			</div>
		</div>
	);
};

export default App;
