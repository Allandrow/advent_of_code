import { sample } from './sample.js';
import { input } from './input.js';

const data = input || sample;

export const results = [] as number[];
let total = 0;

data.split('\n').forEach((line) => {
   if (!line) {
      results.push(total);
      total = 0;
   } else {
      total += parseInt(line);
   }
});

results.push(total);

const result = Math.max(...results);

// console.log(result);

// 69281
