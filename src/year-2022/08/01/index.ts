import { input } from './input.js';
import { sample } from './sample.js';

interface HiddenBy {
   top: number;
   left: number;
   bottom: number;
   right: number;
}

interface Previous {
   top: number[];
   left: number[];
   bottom: number[];
   right: number[];
}

interface Tree {
   value: number;
   isVisible: boolean;
   isEdge: boolean;
   hiddenBy: Partial<HiddenBy>;
   previous: Previous;
}

type Direction = 'top' | 'bottom' | 'left' | 'right';

// UTILS

const getCoords = (n: number) => [n % yLength, Math.floor(n / xLength)];
const isEdge = (x: number, y: number) => {
   const isXEdge = x === 0 || x === yLength - 1;
   const isYEdge = y === 0 || y === xLength - 1;

   return isXEdge || isYEdge;
};

const getNeighbour = (x: number, y: number, direction: Direction) => {
   switch (direction) {
      case 'top':
         return map.get(`${y - 1}-${x}`);
      case 'bottom':
         return map.get(`${y + 1}-${x}`);
      case 'left':
         return map.get(`${y}-${x - 1}`);
      case 'right':
         return map.get(`${y}-${x + 1}`);
      default:
         throw new Error(`${direction} is not a direction`);
   }
};

const getHiddenBy = (tree: Tree, x: number, y: number, direction: Direction) => {
   const { hiddenBy } = tree;
   const neighbour = getNeighbour(x, y, direction);
   const hiddenByDirection = neighbour.hiddenBy[direction];
   const tallest = hiddenByDirection && neighbour.value < hiddenByDirection ? hiddenByDirection : neighbour.value;

   if (tallest >= tree.value) {
      return { ...hiddenBy, [direction]: tallest };
   }

   return hiddenBy;
};

const setVisibility = (tree: Tree) => {
   const isVisible = Object.values(tree.hiddenBy).length < 4;

   return { ...tree, isVisible };
};

const setMap = (array: number[]) => {
   const map = new Map<string, Tree>();
   array.forEach((n, i) => {
      const [x, y] = getCoords(i);
      const key = `${y}-${x}`;
      const item: Tree = {
         value: n,
         isVisible: true,
         isEdge: isEdge(x, y),
         hiddenBy: {},
         previous: {
            top: [],
            left: [],
            bottom: [],
            right: []
         }
      };
      map.set(key, item);
   });

   return map;
};

// DATA FORMATTING

const data = input || sample;

const splitData = data.split('\n');

const yLength = splitData.length;
const xLength = splitData[0].length;

const flattenedData = splitData.join('').split('').map(Number);
const map = setMap(flattenedData);

// DATA MANIPULATION

// loop from top left
flattenedData.forEach((_, i) => {
   const [x, y] = getCoords(i);
   const key = `${y}-${x}`;
   let current = map.get(key);

   if (x > 0) {
      const {
         value,
         previous: { left }
      } = getNeighbour(x, y, 'left');
      current.previous.left = [value, ...left];
   }

   if (y > 0) {
      const {
         value,
         previous: { top }
      } = getNeighbour(x, y, 'top');
      current.previous.top = [value, ...top];
   }

   if (!current.isEdge) {
      current = { ...current, isVisible: false, hiddenBy: getHiddenBy(current, x, y, 'top') };
      current = { ...current, isVisible: false, hiddenBy: getHiddenBy(current, x, y, 'left') };
      map.set(key, setVisibility(current));
   }
});

// loop from bottom right
for (let i = flattenedData.length - 1; i >= 0; i--) {
   const [x, y] = getCoords(i);
   const key = `${y}-${x}`;
   let current = map.get(key);

   if (x < xLength - 1) {
      const {
         value,
         previous: { right }
      } = getNeighbour(x, y, 'right');
      current.previous.right = [value, ...right];
   }

   if (y < yLength - 1) {
      const {
         value,
         previous: { bottom }
      } = getNeighbour(x, y, 'bottom');
      current.previous.bottom = [value, ...bottom];
   }

   if (!current.isEdge) {
      current = { ...current, isVisible: false, hiddenBy: getHiddenBy(current, x, y, 'bottom') };
      current = { ...current, isVisible: false, hiddenBy: getHiddenBy(current, x, y, 'right') };

      map.set(key, setVisibility(current));
   }
}

// const visibles = [...map].filter(([_, { isVisible }]) => isVisible);

const result = [...map].map(([_, x]) => {
   const { previous, value } = x;

   const isAboveVal = (n: number) => n >= value;
   const getIndex = (arr: number[]) => {
      if (arr.length === 0) {
         return 0;
      }

      const index = arr.findIndex(isAboveVal);
      return index === -1 ? arr.length : index + 1;
   };

   const top = getIndex(previous.top);
   const left = getIndex(previous.left);
   const right = getIndex(previous.right);
   const bottom = getIndex(previous.bottom);

   return [top, left, right, bottom].reduce((total, val) => total * val);
});

console.log(Math.max(...result));
