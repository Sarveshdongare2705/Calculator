import React, { useState } from "react";
import './styles/calc.css';
import { storeEquationHistory } from "../firebaseUtils";

const Calc = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('0');
  const buttons = ['AC', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '00', '0', '.', 'π', '(', ')', '√', 'sin', 'cos', 'tan', '^' , '='];

  const calculate = (input) => {
    try {
      const parsedInput = parseInput(input);
      const result = evaluate(parsedInput);
      const roundedResult = Number(result.toFixed(4));
      return String(roundedResult);
    } catch (error) {
      return 'Error';
    }
  };
  
  const parseInput = (input) => {
    return input.split(/([+\-*/^()])/).filter(token => token.trim() !== '');
  };
  const evaluate = (tokens) => {
    const operators = [];
    const operands = [];
  
    const applyOperation = (operator, operands) => {
      const b = operands.pop();
      const a = operands.pop();
  
      switch (operator) {
        case '+':
          operands.push(a + b);
          break;
        case '-':
          operands.push(a - b);
          break;
        case '*':
          operands.push(a * b);
          break;
        case '/':
          operands.push(a / b);
          break;
        case '^':
          operands.push(Math.pow(a, b));
          break;
        case 'sin':
          operands.push(Math.sin(b));
          break;
        case 'sin':
          operands.push(Math.cos(b));
          break;
        case 'tan':
          operands.push(Math.tan(b));
          break;
        default:
          throw new Error('Invalid operator: ' + operator);
      }
    };
  
    for (const token of tokens) {
      if (token === '+' || token === '-' || token === '*' || token === '/' || token === '^' || token === 'sin' || token === 'cos'|| token === 'tan') {
        operators.push(token);
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators.length > 0 && operators[operators.length - 1] !== '(') {
          applyOperation(operators.pop(), operands);
        }
        operators.pop(); 
      } else {
        operands.push(parseFloat(token));
      }
    }
  
    while (operators.length > 0) {
      applyOperation(operators.pop(), operands);
    }
  
    return operands[0];
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
    }  else if (value === 'π') {
      setInput((prevInput) => prevInput + '3.14');}
    else {
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
