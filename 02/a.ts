const input = await Deno.readTextFile('2/input.txt');
const games = input.trim().split('\n');

const LOSE_SCORE = 0;
const TIE_SCORE = 3;
const WIN_SCORE = 6;

enum Opponent {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum Player {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

function calculateWin(opponent: string, player: string): number {
  switch (opponent) {
    case Opponent.Rock:
      switch (player) {
        case Player.Rock: return TIE_SCORE;
        case Player.Paper: return WIN_SCORE;
        case Player.Scissors: return LOSE_SCORE;
      }
    break;

    case Opponent.Paper:
      switch (player) {
        case Player.Rock: return LOSE_SCORE;
        case Player.Paper: return TIE_SCORE;
        case Player.Scissors: return WIN_SCORE;
      }
    break;

    case Opponent.Scissors:
      switch (player) {
        case Player.Rock: return WIN_SCORE;
        case Player.Paper: return LOSE_SCORE;
        case Player.Scissors: return TIE_SCORE;
      }
    break;
  }

  return 0;
}

function calculatePlayerScore(player: string): number {
  switch (player) {
    case Player.Rock: return 1;
    case Player.Paper: return 2;
    case Player.Scissors: return 3;
  }

  return 0;
}

let totalScore = 0;

for (const game of games) {
  const [opponent, player] = game.split(' ');

  const winScore = calculateWin(opponent, player);
  const playerScore = calculatePlayerScore(player);

  totalScore += winScore + playerScore;
}

console.log(totalScore);
