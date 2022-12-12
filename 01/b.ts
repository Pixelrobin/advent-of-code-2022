const input = await Deno.readTextFile('1/input.txt');

const elfs = input
  .split('\n\n')
  .map(group => group.split('\n'));

const totals = [];

for (const elf of elfs) {
  let total = 0;
  for (const calories of elf) {
    total += parseInt(calories, 10);
  }

  totals.push(total);
}

const sorted = totals.sort((a, b) => b - a);
console.log(sorted[0] + sorted[1] + sorted[2]);
