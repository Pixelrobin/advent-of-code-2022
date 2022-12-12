const INPUT_FILE = '9/input.txt';
const DEBUG = true;

type moveDirection = 'U' | 'D' | 'L' | 'R';

const debugSegments: Segment[] = [];
const visited: Record<string, boolean> = {};

function markVisited(x: number, y: number) {
  visited[`${x}-${y}`] = true;
}

class Segment {
  public x: number;
  public y: number;

  private trailer?: Segment;

  // These are the positions (in order) to check for when moving to follow a leader
  // See this.trail()
  public static trailChecks: number[][] = [
    // Check horizontal/vertical positions, those are priority
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],

    // Finally, check the corners
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];

  constructor(x: number, y: number, trailer?: Segment) {
    this.x = x;
    this.y = y;

    if (trailer) {
      this.trailer = trailer;
    }

    if (DEBUG) {
      debugSegments.push(this);
    }
  }

  public move(direction: moveDirection, amount: number) {
    let xdir = 0;
    let ydir = 0;

    switch (direction) {
      case 'U': ydir = -1; break;
      case 'D': ydir = 1; break;
      case 'L': xdir = -1; break;
      case 'R': xdir = 1; break;
    }

    for (let s = 0; s < amount; s ++) {
      this.update(this.x + xdir, this.y + ydir);
    }
  }

  public trail(leader: Segment) {
    if (this.isAdjacentTo(leader.x, leader.y)) {
      this.update(this.x, this.y);
      return;
    }

    for (const check of Segment.trailChecks) {
      if (this.isAdjacentTo(leader.x + check[0], leader.y + check[1])) {
        this.update(leader.x + check[0], leader.y + check[1]);
        break;
      }
    }
  }

  private update(x: number, y: number) {
    this.x = x;
    this.y = y;

    if (this.trailer) {
      this.trailer.trail(this);
    } else {
      markVisited(this.x, this.y);
    }
  }

  private isAdjacentTo(x: number, y: number) {
    const xdis = Math.abs(this.x - x);
    const ydis = Math.abs(this.y - y);
    return xdis <= 1 && ydis <= 1;
  }
}

function debugGrid() {
  const xpositions = debugSegments.map(segment => segment.x);
  const ypositions = debugSegments.map(segment => segment.y);

  const xmin = Math.min(0, ...xpositions);
  const xmax = Math.max(0, ...xpositions);

  const ymin = Math.min(0, ...ypositions);
  const ymax = Math.max(0, ...ypositions);

  for (let y = ymin; y <= ymax; y ++) {
    let line = '';

    xloop: for (let x = xmin; x <= xmax; x ++) {
      for (let s = 0; s < debugSegments.length; s ++) {
        const segment = debugSegments[s];
        if (segment.x === x && segment.y === y) {
          line += [debugSegments.length - 1 - s].toString();
          continue xloop;
        }
      }

      if (x === 0 && y === 0) {
        line += 's';
        continue;
      }

      line += '.';
    }

    console.log(line);
  }
}

// Create the trail of segments
const tail = new Segment(0, 0);

let last = tail;
for (let i = 8; i > 0; i --) {
  last = new Segment(0, 0, last);
}

const head = new Segment(0, 0, last);

// Run the movements
const input = await Deno.readTextFile(INPUT_FILE);
const lines = input.split('\n');

for (const line of lines) {
  const tokens = line.split(' ');

  const direction = tokens[0] as moveDirection;
  const distance = parseInt(tokens[1], 10);

  // markVisited(tail.x, tail.y);
  head.move(direction, distance);

  if (DEBUG) {
    console.log('==', direction, distance, '==');
    console.log('');
    debugGrid();
    console.log('');
  }
}

console.log(Object.keys(visited).length);
