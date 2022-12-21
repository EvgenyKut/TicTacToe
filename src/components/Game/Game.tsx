import React from 'react';
import { initialState } from '../../constants';
import {
  calculateNextValue,
  calculateStatus,
  calculateWinner,
} from '../../helpers';
import { useLocalStorageState } from '../../hooks/useLocalStorage';
import Board from '../Board';
import './game.css';

const Game = () => {
  const [history, setHistory] = useLocalStorageState({
    key: 'history',
    defaultValue: [initialState],
  });
  const [currentStep, setCurrentStep] = useLocalStorageState({
    key: 'currentStep',
    defaultValue: 0,
  });

  const moves = history.map((stepSquares: [], step: number) => {
    const description = step === 0 ? `Go to start game` : `Go to move #${step}`;
    const isCurrentStep = step === currentStep;
    return (
      <li key={step}>
        <button
          disabled={isCurrentStep}
          onClick={() => {
            setCurrentStep(step);
          }}
        >
          {description} {isCurrentStep ? 'current' : null}{' '}
        </button>
      </li>
    );
  });

  const currentSquares = history[currentStep];
  const nextValue = calculateNextValue(currentSquares);
  const winner = calculateWinner(currentSquares);
  const status = calculateStatus({
    winner,
    squares: currentSquares,
    nextValue,
  });

  const selectSquare = (square: number) => {
    if (winner || currentSquares[square]) return;
    const squaresCopy = [...currentSquares];
    squaresCopy[square] = nextValue;
    const newHistory = history.slice(0, currentStep + 1);
    const updatedData = [...newHistory, squaresCopy];
    setHistory(updatedData);
    setCurrentStep(newHistory.length);
  };

  const restart = () => {
    setCurrentStep(0);
    setHistory([initialState]);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
