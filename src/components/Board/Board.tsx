import React from 'react';
import { TSquares } from '../../types';
import './board.css';
type BoardType = {
  squares: TSquares;
  onClick: (it: number) => void;
};
const Board: React.FC<BoardType> = ({ squares, onClick }) => {
  const renderSquare = (i: number) => {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    );
  };
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
