const input = await Deno.readTextFile('8/input.txt');

const grid = input.split('\n').map(
    line => line.split('').map(
      letter => parseInt(letter, 10)
    )
);

function getMaxHeightInRange(xfrom: number, xto: number, yfrom: number, yto: number) {
  let max = 0;

  for (let y = yfrom; y <= yto; y ++) {
    for (let x = xfrom; x <= xto; x ++) {
      const height = grid[y][x];

      if (height > max) {
        max = height;
      }

      if (max === 9) {
        break;
      }
    }
  }

  return max;
}

// Start with the edge count
let visible = grid.length * 2 + grid[0].length * 2 - 4;

for (let y = 1; y < grid.length - 1; y ++) {
  for (let x = 1; x < grid[y].length - 1; x ++) {
    const height = grid[y][x];

    const leftMax = getMaxHeightInRange(0, x - 1, y, y);
    if (height > leftMax) {
      visible ++;
      continue;
    }

    const rightMax = getMaxHeightInRange(x + 1, grid[y].length - 1, y, y);
    if (height > rightMax) {
      visible ++;
      continue;
    }

    const topMax = getMaxHeightInRange(x, x, 0, y - 1);
    if (height > topMax) {
      visible ++;
      continue;
    }

    const bottomMax = getMaxHeightInRange(x, x, y + 1, grid.length - 1);
    if (height > bottomMax) {
      visible ++;
      continue;
    }
  }
}

console.log(visible);
