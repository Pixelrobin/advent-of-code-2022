const input = await Deno.readTextFile('3/input.txt');

const rucksacks = input.split('\n');

let total = 0;

function getItemPriority(item: string): number {
  const charCode = item[0].charCodeAt(0);

  // Lowercase
  if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  }

  // Uppercase
  if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  }

  return 0;
}

for (const rucksack of rucksacks) {
  const splitIndex = rucksack.length / 2;

  const one = rucksack.substring(0, splitIndex).split('');
  const two = rucksack.substring(splitIndex).split('');

  let same = '';

  for (const item of one) {
    for (const otherItem of two) {
      if (item === otherItem) {
        same = item;
      }
    }
  }

  if (same) {
    total += getItemPriority(same);
  }
}

console.log(total);
