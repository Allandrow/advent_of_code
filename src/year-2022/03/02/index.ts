import { input } from '../01/input.js';
import { sample } from '../01/sample.js';

const data = input || sample;

const lines = data.split('\n');

const setOf = (str) => [...new Set(str)];

const result = [];
for (let i = 0; i < lines.length; i += 3) {
   const letter = setOf(lines[i]).find((l) => setOf(lines[i + 1]).includes(l) && setOf(lines[i + 2]).includes(l));
   result.push(letter);
}

const score = result.reduce((sum, letter) => {
   const charCode = letter.charCodeAt(0);
   return charCode >= 97 ? sum + charCode - 96 : sum + charCode - 38;
}, 0);

console.log(score);
