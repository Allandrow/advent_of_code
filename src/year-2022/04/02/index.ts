import { getIndices } from '../01/index.js';
import { input } from '../01/input.js';
import { sample } from '../01/sample.js';

const data = input || sample;

const isOverlapping = ([start1, end1]: number[], [start2, end2]: number[]) => {
   return (start1 <= start2 && start2 <= end1) || (start2 <= start1 && start1 <= end2) 
};

const result = data.split('\n').reduce((sum, line) => {
   const [arr1, arr2] = line.split(',');

   return isOverlapping(getIndices(arr1), getIndices(arr2)) ? sum + 1 : sum;
}, 0);

console.log(result);
