import { input } from "./input.js";
import { sample } from "./sample.js";

const data = input || sample
const instructions = data.split('\n');

type Pixel = '#' | '.';
type Row = Pixel[];
type Sprite = [number, number, number];

const createRow = (length: number): Row => {
   return Array.from({ length }, () => '.');
};

class Screen {
   rows: Row[];
   value: number;
   cycle: number;
   sprite: Sprite;

   constructor(rows: Row[]) {
      this.rows = rows;
      this.cycle = 0;
      this.value = 1;
      this.sprite = [0, 1, 2];
   }

   addValue(value: number) {
    this.value += value
    this.updateSprite()
   }

   updateSprite() {
    const left = Math.max(this.value - 1, 0)
    const right = Math.min(this.value + 1, 39)
    const center = (left + right) / 2
    this.sprite = [left, center, right]
   }

   addCycle() {
    this.paintScreen()
    this.cycle++
   }

   paintScreen() {
    const xPos = this.cycle % 40
    if(this.sprite.includes(xPos)) {
      const yPos = Math.floor(this.cycle / 40)
      this.rows[yPos][xPos] = '#'
    }
   }

   display() {
      this.rows.forEach((row) => console.log(row.join('')));
   }

   static create() {
      const screen = Array.from({ length: 6 }, () => createRow(40));
      return new Screen(screen);
   }
}

const screen = Screen.create();

instructions.forEach(line => {
  screen.addCycle()
  const value = line.split(' ')[1]
  if(value) {
    screen.addCycle()
    screen.addValue(parseInt(value, 10))
  }
})

screen.display();