import { input } from "./input.js";
import { sample } from "./sample.js";

const data = input || sample

const result = data.split('\n').reduce((sum, line) => {
  const sep = line.length / 2
  const [arr1, arr2] = [line.substring(0, sep).split(''), line.substring(sep).split('')]  

  const charCode = arr1.find(c => arr2.includes(c)).charCodeAt(0)

  return charCode >= 97 ? sum + charCode - 96 : sum + charCode - 38
}, 0)

console.log(result)