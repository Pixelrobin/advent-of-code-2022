interface FileNode {
  name: string;
  type: 'file';
  size: number;
}

interface DirectoryNode {
  name: string;
  type: 'dir';
  children: Node[];
}

type Node = FileNode | DirectoryNode;

const tree: DirectoryNode = {
  name: '/',
  type: 'dir',
  children: []
}

const input = await Deno.readTextFile('7/input.txt');
const lines = input.split('\n');

class Parser {
  private tree: DirectoryNode;
  private location: DirectoryNode[];

  private command = '';
  private output: string[] = [];

  constructor(tree: DirectoryNode) {
    this.tree = tree;
    this.location = [tree];
  }

  public parse(lines: string[]) {
    for (const line of lines) {
      if (line.startsWith('$')) {
        // This is kinda confusing, but when you encounter a command, parse the last known one
        this.parseCommand();
        this.command = line;
      } else {
        // Otherwise this is the output of the previous command, record it and keep going
        this.output.push(line);
      }
    }

    // Parse last trailing command
    this.parseCommand();
  }

  private getCurrentNode(): DirectoryNode {
    return this.location.at(-1) ?? this.tree;
  }

  private parseCommand() {
    if (!this.command) {
      return;
    }

    const tokens = this.command.split(' ');

    switch (tokens[1]) {
      case 'cd':
        this.cd(tokens[2]);
      break;

      case 'ls':
        this.ls();
      break;
    }

    // Reset
    this.command = '';
    this.output = [];
  }

  private cd(to: string) {
    if (to === '/') {
      this.location = [this.tree];
      return;
    }

    if (to === '..') {
      this.location.pop();
      return;
    }

    const node = this.getCurrentNode().children.find(
      (child) => child.type === 'dir' && child.name === to
    ) as DirectoryNode;

    if (node) {
      this.location.push(node);
    }
  }

  private ls() {
    for (const line of this.output) {
      const tokens = line.split(' ');

      let node: Node;

      if (tokens[0] === 'dir') {
        node = {
          type: 'dir',
          name: tokens[1],
          children: [],
        } as DirectoryNode;
      } else {
        node = {
          type: 'file',
          name: tokens[1],
          size: parseInt(tokens[0], 10),
        } as FileNode;
      }

      this.getCurrentNode().children.push(node);
    }
  }
}

const parser = new Parser(tree);
parser.parse(lines);

let sum = 0;

function calculateNodeSums(node: DirectoryNode, trail: string[] = []): number {
  let nodeSize = 0;

  // Keeping track of the trail is just for fun console output and debugging
  trail = [...trail, node.name];

  for (const child of node.children) {
    if (child.type === 'dir') {
      nodeSize += calculateNodeSums(child, trail);
    } else {
      nodeSize += child.size;
    }
  }

  if (nodeSize <= 100000) {
    console.log(trail.join(' > '), nodeSize);
    sum += nodeSize;
  }

  return nodeSize;
}

calculateNodeSums(tree);

console.log('---------');
console.log('Sum of directory sizes that are under 100,000:');
console.log(sum);
