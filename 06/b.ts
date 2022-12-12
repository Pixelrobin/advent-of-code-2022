const input = await Deno.readTextFile('6/input.txt');

function checkUnique(input: string): boolean {
  const chars = input.split('');

  for (let c = 0; c < chars.length; c ++) {
    const char = chars[c];
    chars[c] = ' ';

    for (const checkChar of chars) {
      if (checkChar === char) {
        return false;
      }
    }
  }

  return true;
}

const UNIQUE_LENGTH = 14;

for (let x = UNIQUE_LENGTH; x < input.length; x ++) {
  const group = input.substring(x - UNIQUE_LENGTH, x);
  if (checkUnique(group)) {
    console.log(x);
    break;
  }
}
