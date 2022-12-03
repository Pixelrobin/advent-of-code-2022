const input = await Deno.readTextFile('./input.txt');

const elfs = input
  .split('\n\n')
  .map(group => group.split('\n'));

let biggest = 0;

for (const elf of elfs) {
  let total = 0;
  for (const calories of elf) {
    total += parseInt(calories, 10);
  }

  if (total > biggest) {
    biggest = total;
  }
}

console.log(biggest);
