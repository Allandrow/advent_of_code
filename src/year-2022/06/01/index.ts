import { input } from "./input.js";
import { sample } from "./sample.js";

const data = input || sample

let result
let i=0
while(!result) {
  const substring = data.substring(i, i+4)
  const set = [...new Set(substring)]
  
  if(set.length === substring.length) {
    result = i+4
  }

  i++
}

console.log(result)