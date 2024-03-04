import React, { useState } from "react";
import './styles/calc.css';
import { storeEquationHistory } from "../firebaseUtils";

const Calc = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('0');
  const buttons = ['AC', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '00', '0', '.', '='];

  const calculate = (input) => {
    try {
      const operators = /[+\-*/]/g;
      const numbers = input.split(operators).map(Number);
      const operations = input.match(operators);
  
      let result = numbers[0];
  
      for (let i = 0; i < operations.length; i++) {
        const currentOperator = operations[i];
        const next = numbers[i + 1];
  
        switch (currentOperator) {
        case '+':
            result += next;
            break;
        case '-':
            result -= next;
            break;
        case '*':
            result *= next;
            break;
        case '**':
                result = Math.pow(result , next);
                break;
        case '/':
            result /= next;
            break;
        default:
            throw new Error('Error: Invalid operator');
        }
      }
  
      return String(result);
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
