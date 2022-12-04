import { input } from './input.js';
import { sample } from './sample.js';

const data = input || sample;

const getIndices = (str: string) => str.split('-').map(Number);
const isContained = ([start1, end1]: number[], [start2, end2]: number[]) => {
  return (start1 <= start2 && end1 >= end2) || (start1 >= start2 && end1 <= end2);
}

const result = data.split('\n').reduce((sum, line) => {
   const [arr1, arr2] = line.split(',');
   return isContained(getIndices(arr1), getIndices(arr2)) ? sum + 1 : sum;
}, 0);

console.log(result);
