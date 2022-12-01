import { sample } from '../01/sample.js';
import { input } from '../01/input.js';
import { results } from '../01/index.js';

const numSorter = (a, b) => a - b;
const sortedData = [...results].sort(numSorter);

const result = sortedData.slice(-3).reduce((total, value) => total + value, 0);

console.log(result);
