const input = await Deno.readTextFile('10/input.txt');

let cycle = 1;

const lines = input.split('\n');
let x = 1;
let sum = 0;

const checks = [20, 60, 100, 140, 180, 220];

for (const line of lines) {
  const tokens = line.split(' ');
  let wait = 0;
  let add = 0;

  switch (tokens[0]) {
    case 'noop':
      wait = 1;
    break;

    case 'addx':
      wait = 2;
      add = parseInt(tokens[1]);
    break;
  }

  while (wait > 0) {
    cycle ++;
    wait --;

    if (wait === 0) {
      x += add;
    }

    if (cycle === checks[0]) {
      sum += x * cycle;
      checks.shift();
    }
  }
}

console.log(sum);
