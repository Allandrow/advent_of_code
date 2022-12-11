import { input } from './input.js';
import { largeSample } from './sample.js';

const data = input || largeSample;

const instructions = data.split('\n').map((line) => {
   const [direction, times] = line.split(' ');

   return { direction, times: parseInt(times, 10) };
});

const wentTo = new Set();
// y-x
wentTo.add('y:0 x:0');

const diff = (x: number, y: number) => Math.abs(x - y);

class Knot {
   x: number;
   y: number;
   next: Knot | null;

   constructor() {
      this.x = 0;
      this.y = 0;
      this.next = null;
   }

   move([x, y]: number[]) {
      this.x = x;
      this.y = y;

      if (this.next) {
        const currentX = this.x
        const currentY = this.y
        const nextX = this.next.x
        const nextY = this.next.y
        const isDiffX = diff(currentX, nextX) >= 2
        const isDiffY = diff(currentY, nextY) >= 2

        if(isDiffX || isDiffY) {
          let newX = currentX
          let newY = currentY

          if(isDiffX){
            newX = currentX > nextX ? nextX + 1 : nextX - 1
          }

          if(isDiffY) {
            newY = currentY > nextY ? nextY + 1 : nextY - 1
          }

          this.next.move([newX, newY])
        }
      } else {
        wentTo.add(`y:${this.y} x:${this.x}`)
      }
   }

   static of() {
      return new Knot();
   }
}

class Rope {
   head: Knot | null;
   tail: Knot | null;
   length: number;

   constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
   }

   insert() {
      const knot = Knot.of();
      if (!this.head) {
         this.head = knot;
         this.tail = knot;
      } else {
         this.tail.next = knot;
         this.tail = knot;
      }

      this.length++;
   }

   move(direction: string) {
      switch (direction) {
         case 'U':
            this.head.move([this.head.x, this.head.y + 1]);
            break;
         case 'D':
            this.head.move([this.head.x, this.head.y - 1]);
            break;
         case 'L':
            this.head.move([this.head.x - 1, this.head.y]);
            break;
         case 'R':
            this.head.move([this.head.x + 1, this.head.y]);
            break;
         default:
            throw new Error(`${direction} is not a valid direction`);
      }
   }
}

const rope = new Rope();

for (let i = 0; i < 10; i++) {
   rope.insert();
}

instructions.forEach(({ direction, times }) => {
   times;
   do {
      rope.move(direction);
      times--;
   } while (times > 0);
});

console.log(wentTo.size);
