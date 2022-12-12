const INPUT_FILE = '10/input.txt'
const SCREEN_WIDTH = 40;

const input = await Deno.readTextFile(INPUT_FILE);
const lines = input.split('\n');

let cycle = 0;
let spriteX = 1;

const pixels: string[][] = [];

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

    const line = Math.floor((cycle - 1) / SCREEN_WIDTH);
    const x = (cycle - 1) % SCREEN_WIDTH;
    const drawSprite = Math.abs(spriteX - x) <= 1;

    if (!pixels[line]) {
      pixels[line] = [];
    }

    pixels[line][x] = drawSprite ? '#' : '.';

    if (wait === 0) {
      spriteX += add;
    }
  }
}

for (const line of pixels) {
  console.log(line.join(''));
}
