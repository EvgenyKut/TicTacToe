export type GameValues = 'X' | 'O';

export type TSquares = GameValues[];

export type CalculateStatusType = {
  winner: string | null;
  nextValue: string;
  squares: TSquares;
};
