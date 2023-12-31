const TOTAL_ROUNDS = 10000;
const INPUT_FILE = '11/sample.txt';
const DEBUG = true;

const input = await Deno.readTextFile(INPUT_FILE);

interface Monkey {
  items: number[];
  expression: string;
  test: number;
  trueTo: number;
  falseTo: number;
  inspections: number;
}

function evaluate(expression: string, vars: Record<string, number>) {
  for (const [variable, value] of Object.entries(vars)) {
    expression = expression.replaceAll(variable, value.toString());
  }

  const tokens = expression.split(' ');

  // TODO: PEMDAS
  // (Please excuse my doomed algorithm system)
  const token = tokens[1];
  const left = parseInt(tokens[0], 10);
  const right = parseInt(tokens[2], 10);

  switch (token) {
    case '+': return left + right;
    case '*': return left * right;
    case '/': return left / right;
  }

  return NaN;
}

function getLastIntegerToken(input: string): number {
  const tokens = input.split(' ');
  return parseInt(tokens[tokens.length - 1], 10);
}

const monkeys: Monkey[] = [];
const lines = input.split('\n');

let monkeyIndex = 0;

for (const line of lines) {
  if (line.startsWith('Monkey')) {
    const trimmed = line.trim().replaceAll(':', '');
    const number = trimmed.split(' ')[1];

    monkeyIndex = parseInt(number, 10);
    monkeys[monkeyIndex] = {
      items: [],
      expression: '',
      test: -1,
      trueTo: -1,
      falseTo: -1,
      inspections: 0,
    }
  }

  if (line.indexOf(':') === -1) {
    continue;
  }

  const [key, value] = line.split(':').map(side => side.trim());

  switch (key) {
    case 'Starting items': {
      const items = value.split(', ').map(item => parseInt(item, 10));
      monkeys[monkeyIndex].items = items;
      break;
    }

    case 'Operation': {
      const split = value.indexOf('=');
      const expression = value.substring(split + 1).trim();
      monkeys[monkeyIndex].expression = expression;
      break;
    }

    case 'Test': {
      monkeys[monkeyIndex].test = getLastIntegerToken(value);
      break;
    }

    case 'If true': {
      monkeys[monkeyIndex].trueTo = getLastIntegerToken(value);
      break;
    }

    case 'If false': {
      monkeys[monkeyIndex].falseTo = getLastIntegerToken(value);
      break;
    }
  }
}

// console.log(monkeys);

const debugRoundChecks = [1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

for (let round = 1; round <= TOTAL_ROUNDS; round ++) {
  for (const monkey of monkeys) {
    while (monkey.items.length > 0) {
      let item = monkey.items.shift();

      if (!item) {
        break;
      }

      item = evaluate(monkey.expression, { old: item });
      // item = Math.floor(item / 3);
      // item = Math.floor(item / monkey.test);

      const to = (item % monkey.test === 0) ? monkey.trueTo : monkey.falseTo;
      // item = item % monkeys[to].test;
      monkeys[to].items.push(item);

      monkey.inspections ++;
    }
  }

  if (DEBUG && round === debugRoundChecks[0]) {
    debugRoundChecks.shift();
    console.log(`== After round ${ round } ==`);

    for (let m = 0; m < monkeys.length; m ++) {
      const monkey = monkeys[m];
      // console.log(`Monkey ${m}:`, monkey.items.join(', '));
      console.log(`Monkey ${m} inspected items ${monkey.inspections} times`);
    }
  }
}

const inspections = monkeys
  .map(monkey => monkey.inspections)
  .sort((a, b) => b - a);

console.log(inspections[0] * inspections[1]);
