import React, { useState } from 'react';
import { CalcButton } from './CalcButton';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [expression, setExpression] = useState<string>('');

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setExpression('');
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setExpression(`${inputValue} ${nextOperator}`);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
      setExpression(`${result} ${nextOperator}`);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    const first = firstOperand || 0;

    switch (operator) {
      case '+':
        return first + inputValue;
      case '-':
        return first - inputValue;
      case '×':
        return first * inputValue;
      case '÷':
        return first / inputValue;
      default:
        return inputValue;
    }
  };

  const handleEquals = () => {
    if (!operator || firstOperand === null) return;

    const result = performCalculation();
    setExpression(`${firstOperand} ${operator} ${display} =`);
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    const percentValue = currentValue / 100;
    setDisplay(String(percentValue));
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  return (
    <div className="w-[320px] bg-black p-4">
      <div className="text-right mb-4">
        <div className="text-orange-500 text-xl h-6 mb-1">
          {expression}
        </div>
        <span className="text-white text-6xl font-light tracking-tight">
          {display}
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <CalcButton onClick={clearAll} variant="secondary">
          C
        </CalcButton>
        <CalcButton onClick={toggleSign} variant="secondary">
          +/-
        </CalcButton>
        <CalcButton onClick={handlePercentage} variant="secondary">
          %
        </CalcButton>
        <CalcButton onClick={() => handleOperator('÷')} variant="primary">
          ÷
        </CalcButton>

        <CalcButton onClick={() => inputDigit('7')}>7</CalcButton>
        <CalcButton onClick={() => inputDigit('8')}>8</CalcButton>
        <CalcButton onClick={() => inputDigit('9')}>9</CalcButton>
        <CalcButton onClick={() => handleOperator('×')} variant="primary">
          ×
        </CalcButton>

        <CalcButton onClick={() => inputDigit('4')}>4</CalcButton>
        <CalcButton onClick={() => inputDigit('5')}>5</CalcButton>
        <CalcButton onClick={() => inputDigit('6')}>6</CalcButton>
        <CalcButton onClick={() => handleOperator('-')} variant="primary">
          -
        </CalcButton>

        <CalcButton onClick={() => inputDigit('1')}>1</CalcButton>
        <CalcButton onClick={() => inputDigit('2')}>2</CalcButton>
        <CalcButton onClick={() => inputDigit('3')}>3</CalcButton>
        <CalcButton onClick={() => handleOperator('+')} variant="primary">
          +
        </CalcButton>

        <CalcButton onClick={() => inputDigit('0')} className="col-span-2">
          0
        </CalcButton>
        <CalcButton onClick={inputDecimal}>.</CalcButton>
        <CalcButton onClick={handleEquals} variant="primary">
          =
        </CalcButton>
      </div>
    </div>
  );
}