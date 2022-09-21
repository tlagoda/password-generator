import "./App.css";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { CgCopy } from 'react-icons/cg'


function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [errors, setErrors] = useState([]);

  // generating the first password
  useEffect(() => {
    generatePassword();
  }, [])

  const generatePassword = () => {
    setErrors([]);
    // adding erros in an array
    let errorsOccured = [];
    if (passwordLength === "") {
      errorsOccured.push("Invalid password length");
    } else if (passwordLength <= 0 || passwordLength > 100) {
      errorsOccured.push("The password length must be between 1 and 100.");
    }
    if (!uppercase && !lowercase && !numbers && !symbols) {
      errorsOccured.push("Please select at least one type of characters.");
    }

    setErrors(errorsOccured);
    // if there is no error, a password is generated
    if (errorsOccured.length === 0) {
      let generatedPassword = "";
      for (let i = 0; i < passwordLength; i++) {
        let typeOfCharacter = randomNum(0, 3);
        if (uppercase && typeOfCharacter === 0) {
          generatedPassword += String.fromCharCode(randomNum(65, 90));
        } else if (lowercase && typeOfCharacter === 1) {
          generatedPassword += String.fromCharCode(randomNum(97, 122));
        } else if (numbers && typeOfCharacter === 2) {
          generatedPassword += randomNum(0, 9);
        } else if (symbols && typeOfCharacter === 3) {
          generatedPassword += randomSymbol();
        } else {
          i--;
        }
      }
      setPassword(generatedPassword)
    }
  };

  const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  const randomSymbol = () => {
    const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>";
    return symbols[randomNum(0, symbols.length - 1)];
  };

  const copyPassword = () => {
    var copyText = document.getElementById("password").value;
    navigator.clipboard.writeText(copyText);
    notify()
  };

  const notify = () => toast.success('Password copied!', {
    position: "bottom-right",
    duration: 2000,
  });



  return (
    <div className="App">
      <div className="main-container">
        <h1>PASSWORD GENERATOR</h1>
        <div className="password-div">
          <input type="text" id="password" readOnly value={password} />
          <div className='copyDiv' onClick={copyPassword}><CgCopy size={30} style={{verticalAlign: 'bottom'}}/></div>
        </div>
        <div className="length-div">
          <span>Length</span>
          <input
            type="number"
            min="1"
            max="100"
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>
        <div className="checkbox-div">
          <div className="option-div">
            <label>Include Uppercase Letters</label>
            <input
              type="checkbox"
              defaultChecked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
          </div>
          <div className="option-div">
            <label>Include Lowercase Letters</label>
            <input
              type="checkbox"
              defaultChecked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
            />
          </div>
          <div className="option-div">
            <label>Include Numbers</label>
            <input
              type="checkbox"
              defaultChecked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
            />
          </div>
          <div className="option-div">
            <label>Include Symbols</label>
            <input
              type="checkbox"
              defaultChecked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
            />
          </div>
        </div>
        <button className="generate-btn" onClick={generatePassword}>
          Generate
        </button>
         {/* display of potential errors */}
        <div className="errors-div">
          {errors.length !== 0 && errors.map((err) => <p>{err}</p>)}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
