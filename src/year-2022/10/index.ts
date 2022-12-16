import { input } from "./input.js";
import { sample } from "./sample.js";

const data = input || sample

const instructions = data.split('\n')

const cycles = [20,60,100,140,180,220]

class Circuit {
  value: number
  cycle: number
  sum: number

  constructor(){
    this.value = 1
    this.cycle = 0
    this.sum = 0
  }

  addCycle(){
    this.cycle+=1
    if(cycles.includes(this.cycle)){
      this.updateSum()
    }
  }

  addValue(value: number){
    this.value += value
  }

  updateSum(){
    const newValue = this.cycle * this.value
    console.log('new value', newValue, 'cycle', this.cycle, 'value', this.value)
    this.sum += newValue
  }
}

const circuit = new Circuit()

instructions.forEach(line => {
  circuit.addCycle()
  const [cmd, value] = line.split(' ')
  if(value) {
    circuit.addCycle()
    circuit.addValue(parseInt(value, 10))
  }
})

console.log(circuit.sum)