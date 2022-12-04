const input = await Deno.readTextFile('2/input.txt');
const games = input.trim().split('\n');

enum Move {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum Result {
  Lose = 'X',
  Tie = 'Y',
  Win = 'Z',
}

function calculateMove(opponentMove: string, result: string): Move {
  switch (opponentMove) {
    case Move.Rock:
      switch (result) {
        case Result.Lose: return Move.Scissors;
        case Result.Tie: return Move.Rock;
        case Result.Win: return Move.Paper;
      }
    break;

    case Move.Paper:
      switch (result) {
        case Result.Lose: return Move.Rock;
        case Result.Tie: return Move.Paper;
        case Result.Win: return Move.Scissors;
      }
    break;

    case Move.Scissors:
      switch (result) {
        case Result.Lose: return Move.Paper;
        case Result.Tie: return Move.Scissors;
        case Result.Win: return Move.Rock;
      }
    break;

  }

  return Move.Rock;
}

const MOVE_SCORE: Record<string, number> = {
  [Move.Rock]: 1,
  [Move.Paper]: 2,
  [Move.Scissors]: 3,
}

const RESULT_SCORE: Record<string, number> = {
  [Result.Lose]: 0,
  [Result.Tie]: 3,
  [Result.Win]: 6,
}

let totalScore = 0;

for (const game of games) {
  const [opponent, result] = game.split(' ');
  const move = calculateMove(opponent, result);
  totalScore += MOVE_SCORE[move] + RESULT_SCORE[result];
}

console.log(totalScore);
