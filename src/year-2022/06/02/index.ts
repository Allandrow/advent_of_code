import { input } from "../01/input.js";
import { sample } from "../01/sample.js";

const data = input || sample

let result
let i=0
while(!result) {
  const substring = data.substring(i, i+14)
  const set = [...new Set(substring)]
  
  if(set.length === substring.length) {
    result = i+14
  }

  i++
}
console.log(result)