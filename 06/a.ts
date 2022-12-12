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

for (let x = 3; x < input.length; x ++) {
  const group = input.substring(x - 3, x + 1);
  if (checkUnique(group)) {
    console.log(x + 1);
    break;
  }
}
