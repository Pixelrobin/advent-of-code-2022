const input = await Deno.readTextFile('5/input.txt');

const [stateInput, stepsInput] = input.split('\n\n').map(lines => lines.split('\n'));

// -- Parse state

const state: string[][] = [];

for (let i = 0; i < 9; i ++) {
  const x = 1 + i * 4;
  let y = stateInput.length - 2;

  state[i] = [];

  while (y >= 0 && stateInput[y][x] !== ' ') {
    state[i].push(stateInput[y][x]);
    y --;
  }
}

// -- Run steps

for (const stepInput of stepsInput) {
  const tokens = stepInput.split(' ');

  const count = parseInt(tokens[1], 10);
  const from = parseInt(tokens[3], 10) - 1;
  const to = parseInt(tokens[5], 10) - 1;

  const moving = state[from].splice(state[from].length - count);
  state[to].push(...moving);
}

// -- Calculate results

let result = '';

for (const stack of state) {
  result += stack[stack.length - 1];
}

console.log(result);
