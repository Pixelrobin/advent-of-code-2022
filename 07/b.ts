// According to reddit, this (and part a) are possible without creating an entire tree, just a map of sizes
// So I want to attempt that

const input = await Deno.readTextFile('7/input.txt');
const lines = input.split('\n');

const PATH_SEPERATOR = '\\';
const TOTAL_SPACE = 70000000;
const UPDATE_SIZE = 30000000;

// Use a map of locations to store sizes
const sizes: Record<string, number> = {};

let location = '';
let currentCommand = '';
let currentOutput: string[] = [];

function changeLocation(to: string) {
  if (to === '/') {
    location = '/';
    return;
  }

  if (to === '..') {
    const split = location.split(PATH_SEPERATOR);
    split.pop();
    location = split.join(PATH_SEPERATOR);
    return;
  }

  location += PATH_SEPERATOR + to;
}

function calculateSizes() {
  let size = 0;

  for (const line of currentOutput) {
    const tokens = line.split(' ');

    if (tokens[0] !== 'dir') {
      size += parseInt(tokens[0], 10);
    }
  }

  sizes[location] = 0;

  const splitLocation = location.split(PATH_SEPERATOR);
  while (splitLocation.length > 0) {
    sizes[splitLocation.join(PATH_SEPERATOR)] += size;
    splitLocation.pop();
  }
}

function parseCommand() {
  if (!currentCommand) {
    return;
  }

  const tokens = currentCommand.split(' ');

  switch (tokens[1]) {
    case 'cd':
      changeLocation(tokens[2]);
    break;

    case 'ls':
      calculateSizes()
    break;
  }

  currentCommand = '';
  currentOutput = [];
}

for (const line of lines) {
  if (line.startsWith('$')) {
    // This is kinda confusing, but when you encounter a command, parse the last known one
    parseCommand();
    currentCommand = line;
    currentOutput = [];
  } else {
    // Otherwise this is the output of the previous command, record it and keep going
    currentOutput.push(line);
  }
}

// Parse last trailing command
parseCommand();

const remainingSpace = TOTAL_SPACE - sizes['/'];
let smallestDeletableSize = sizes['/'];

for (const size of Object.values(sizes)) {
  if (remainingSpace + size >= UPDATE_SIZE && size < smallestDeletableSize) {
    smallestDeletableSize = size;
  }
}

console.log('Remaining Space:', remainingSpace);
console.log('Smallest Deletable Filesize:', smallestDeletableSize);
