import { input } from './input.js';
import { sample } from './sample.js';

// const data = input || sample;
const data = sample

const instructions = data.split('\n').map((line) => {
   const [direction, times] = line.split(' ');

   return { direction, times: parseInt(times, 10) };
});

const wentTo = new Set();
// y-x
wentTo.add('0-0');

const diff = (x:number, y:number) => Math.abs(x-y)

const tail = {
  x: 0,
  y: 0,
  move(xHead:number, yHead:number){
    if(diff(this.x, xHead) >= 2){
      this.x = this.x > xHead ? xHead + 1 : xHead - 1
      this.y = yHead
      wentTo.add(`${this.y}-${this.x}`)
    }

    if(diff(this.y, yHead) >= 2){
      this.x = xHead
      this.y = this.y > yHead ? yHead + 1 : yHead - 1
      wentTo.add(`${this.y}-${this.x}`)
    }
  }
};

const head = {
   x: 0,
   y: 0,
   move(direction: string) {
      switch (direction) {
         case 'U':
            this.y++;
            break;
         case 'D':
            this.y--;
            break;
         case 'L':
            this.x--;
            break;
         case 'R':
            this.x++;
            break;
         default:
            throw new Error(`${direction} is not a valid direction`);
      }
      tail.move(this.x, this.y)
   }
};


instructions.forEach(({direction, times}) => {
  times
  do {
    head.move(direction)
    times--
  } while(times > 0)
})

// console.log(wentTo.size)