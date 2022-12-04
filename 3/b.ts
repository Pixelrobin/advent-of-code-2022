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

for (let i = 0; i < rucksacks.length; i += 3) {
  const one = rucksacks[i].split('');
  const two = rucksacks[i + 1].split('');
  const three = rucksacks[i + 2].split('');

  let same = '';

  for (const oneItem of one) {
    for (const twoItem of two) {
      if (oneItem === twoItem) {
        // If the first two match, try to find a match in the third
        for (const threeItem of three) {
          if (oneItem === threeItem) {
            same = oneItem;
            break;
          }
        }
      }
    }
  }

  if (same) {
    total += getItemPriority(same);
  }
}

console.log(total);
