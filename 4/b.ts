const input = await Deno.readTextFile('4/input.txt');

const pairs = input.split('\n');

function parseAssignment(str: string): number[] {
  return str.split('-').map((part) => parseInt(part, 10));
}

function checkOverlap(first: number[], second: number[]): boolean {
  return (
    (first[0] >= second[0] && first[0] <= second[1]) ||
    (first[1] >= second[0] && first[1] <= second[1])
  );
}

let total = 0;

for (const pair of pairs) {
  const assignments = pair.split(',').map(parseAssignment);

  if (checkOverlap(assignments[0], assignments[1]) || checkOverlap(assignments[1], assignments[0])) {
    total ++;
  }
}

console.log(total);
