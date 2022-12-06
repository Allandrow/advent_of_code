import { input } from '../01/input.js';
import { sample } from '../01/sample.js';

const data = input || sample;

const [schema, instructions] = data.split('\n\n');

const schemaLines = schema.split('\n');

interface Stacks {
   [key: string]: string[];
}
const stacks: Stacks = {};

for (let i = 1; i < schemaLines.length; i++) {
   const line = schemaLines[schemaLines.length - i - 1];
   for (let j = 1; j < line.length; j += 4) {
      const index = Math.floor(j / 4) + 1;
      if (!stacks[index]) {
         stacks[index] = [];
      }

      if (line[j].trim()) {
         stacks[index] = [...stacks[index], line[j]];
      }
   }
}

const isNum = (x) => !isNaN(x);

const instructionsNums = instructions.split('\n').reduce((arr, line) => {
   const lineInstructions = line.split(' ').filter(isNum);
   return [...arr, lineInstructions];
}, []);

instructionsNums.forEach(([quantity, ogKey, newKey]) => {
   const removed = stacks[ogKey].slice(-quantity);
   stacks[ogKey] = [...stacks[ogKey].slice(0, stacks[ogKey].length - quantity)];
   stacks[newKey] = stacks[newKey].concat(removed);
});

const result = Object.values(stacks).reduce((str, stack) => {
   return (str += stack[stack.length - 1]);
}, '');

console.log(result);
