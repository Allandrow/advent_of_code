import { input } from './input.js';
import { sample } from './sample.js';

const data = input || sample;

const values = {
   A: 1,
   B: 2,
   C: 3,
   X: 1,
   Y: 2,
   Z: 3
};

const versus = {
   X: 'C',
   Y: 'A',
   Z: 'B'
};

const result = data
   .split('\n')
   .map((l) => l.split(' '))
   .reduce((total, game) => {
      total += parseInt(values[game[1]]);

      if (values[game[0]] === values[game[1]]) {
         return total + 3;
      }

      if (game[0] === versus[game[1]]) {
         return total + 6;
      }

      return total;
   }, 0);

console.log(result);
