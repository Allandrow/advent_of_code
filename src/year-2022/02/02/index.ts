import { input } from "../01/input.js";
import { sample } from "../01/sample.js";

/**
 * X : lose
 * Y: draw
 * Z: win
 */

 const values = {
  A: 1,
  B: 2,
  C: 3,
  X: 0,
  Y: 3,
  Z: 6
};

const matchingValues = {
  A: {
    win: 'C',
    lose: 'B'
  },
  B: {
    win: 'A',
    lose: 'C'
  },
  C: {
    win: 'B',
    lose: 'A'
  }
}

const data = input || sample

const result = data
   .split('\n')
   .map((l) => l.split(' ')).reduce((total, [hand, outcome]) => {
      total += values[outcome]

      if(outcome === 'X'){
        const val = matchingValues[hand].win
        return total += values[val]
      }

      if(outcome === 'Z'){
        const val = matchingValues[hand].lose
        return total += values[val]
      }


      return total + values[hand]
   }, 0)


console.log(result)