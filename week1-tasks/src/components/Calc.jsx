import React, { useState } from "react";
import './styles/calc.css';
import { storeEquationHistory } from "../firebaseUtils";

const Calc = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('0');
  const buttons = ['AC', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '00', '0', '.', 'π', '(', ')', '√', 'sin', 'cos', 'tan', '^' , '='];

  const calculate = (input) => {
    try {
      const replacedInput = input.replace(/sin/g, 'Math.sin')
                                 .replace(/cos/g, 'Math.cos')
                                 .replace(/tan/g, 'Math.tan')
                                 .replace(/√/g, 'Math.sqrt')
                                 .replace(/\^/g, '**')
                                 .replace(/π/g, 'Math.PI');
  
      const result = eval(replacedInput);
      const roundedResult = Number(result.toFixed(4));
      return String(roundedResult);
    } catch (error) {
      return 'Error';
    }
  };
  

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setInput('');
      setOutput('0');
    } else if (value === 'DEL') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (value === '=') {
      try {
        const result = calculate(input);
        setInput(result.toString());
        setOutput(result.toString());
        storeEquationHistory(input, result);
      } catch (error) {
        setInput('');
        setOutput('Error');
      }
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  return (
    <div className="Calc">
      <div className="input">{input}</div>
      <div className="output">{output}</div>
      <div className="grid">
        {buttons.map((button, index) => (
          <button key={index} className="gridbutton" onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calc;
