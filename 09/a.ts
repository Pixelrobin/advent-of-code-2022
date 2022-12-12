const input = await Deno.readTextFile('9/input.txt');

class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(other: Vector) {
    this.x += other.x;
    this.y += other.y;
  }

  public isAdjacentTo(other: Vector) {
    const xx = this.x - other.x;
    const yy = this.y - other.y;
    const distance = Math.sqrt(xx * xx + yy * yy);

    return distance < 1.5;
  }
}

const head = new Vector(0, 0);
const tail = new Vector(0, 0);

const visited: Record<string, boolean> = {};

function debugGrid(head: Vector, tail: Vector) {
  console.log('   ');

  const xmin = Math.min(0, head.x, tail.x);
  const xmax = Math.max(0, head.x, tail.x);

  const ymin = Math.min(0, head.y, tail.y);
  const ymax = Math.max(0, head.y, tail.y);

  for (let y = ymin; y <= ymax; y ++) {
    let line = '';

    for (let x = xmin; x <= xmax; x ++) {
      if (head.x === x && head.y === y) {
        line += 'H';
      } else if (tail.x === x && tail.y === y) {
        line += 'T';
      } else if (x === 0 && y === 0) {
        line += 's';
      } else {
        line += '.';
      }
    }

    console.log(line);
  }
}

function markVisited(x: number, y: number) {
  visited[`${x}-${y}`] = true;
}

function updateTail() {
  const move = (x: number, y: number): boolean => {
    const position = new Vector(x, y);

    if (position.isAdjacentTo(tail)) {
      tail.x = position.x;
      tail.y = position.y;

      return true;
    }

    return false;
  }

  // Prioritize vertical/horizontal movements
  if (move(head.x, head.y - 1)) return;
  if (move(head.x, head.y + 1)) return;
  if (move(head.x - 1, head.y)) return;
  if (move(head.x + 1, head.y)) return;

  if (move(head.x - 1, head.y - 1)) return;
  if (move(head.x + 1, head.y - 1)) return;
  if (move(head.x - 1, head. y + 1)) return;
  if (move(head.x + 1, head.y + 1)) return;
}

function move(direction: Vector, distance: number) {
  for (let i = 0; i < distance; i ++) {
    head.add(direction);

    if (!tail.isAdjacentTo(head)) {
      updateTail();
    }

    markVisited(tail.x, tail.y);
    // debugGrid(head, tail);
  }
}

const lines = input.split('\n');

for (const line of lines) {
  const tokens = line.split(' ');

  const direction = tokens[0];
  const distance = parseInt(tokens[1], 10);

  switch (direction) {
    case 'U':
      move(new Vector(0, -1), distance);
    break;

    case 'D':
      move(new Vector(0, 1), distance);
    break;

    case 'L':
      move(new Vector(-1, 0), distance);
    break;

    case 'R':
      move(new Vector(1, 0), distance);
    break;
  }
}

console.log(Object.keys(visited).length);
