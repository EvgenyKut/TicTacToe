import { lines } from '../constants';
import { CalculateStatusType, TSquares } from '../types';

export function calculateStatus({
  winner,
  squares,
  nextValue,
}: CalculateStatusType) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

export function calculateNextValue(squares: TSquares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

export function calculateWinner(squares: TSquares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
