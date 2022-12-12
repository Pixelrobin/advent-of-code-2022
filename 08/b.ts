const input = await Deno.readTextFile('8/input.txt');

const grid = input.split('\n').map(
    line => line.split('').map(
      letter => parseInt(letter, 10)
    )
);

type direction = 0 | 1 | -1;

function look(x: number, y: number, xdir: direction, ydir: direction, compareHeight: number): number {
  let distance = 0;
  let height = 0;

  while (
    height < compareHeight &&
    (x > 0 && x < grid[y].length - 1) &&
    (y > 0 && y < grid.length - 1)
  ) {
    distance ++;

    x += xdir;
    y += ydir;

    height = grid[y][x];
  }

  return distance;
}

let maxScore = 0;

for (let y = 1; y < grid.length - 1; y ++) {
  for (let x = 1; x < grid[y].length - 1; x ++) {
    const height = grid[y][x];

    const left = look(x, y, -1, 0, height);
    const right = look(x, y, 1, 0, height);
    const top = look(x, y, 0, -1, height);
    const bottom = look(x, y, 0, 1, height);

    const score = left * right * top * bottom;

    if (score > maxScore) {
      maxScore = score;
    }
  }
}

console.log(maxScore);
