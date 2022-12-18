import { input } from "./input.js";
import { sample } from "./sample.js";

const data = input || sample;

class Graph {
  adjacencyList: Map<string, Set<string>>;
  start: string;
  end: string;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(coords: string) {
    if (!this.adjacencyList.get(coords)) {
      this.adjacencyList.set(coords, new Set());
    }
  }

  addEdge(c1: string, c2: string) {
    const c1Edges = this.adjacencyList.get(c1) || new Set();
    this.adjacencyList.set(c1, c1Edges.add(c2));
  }

  addStart(coords: string) {
    this.start = coords;
  }

  addEnd(coords: string) {
    this.end = coords;
  }

  search() {
    let queue = [{ coords: this.start, distance: 0 }];
    const visited = new Set();
    let pathDistance = 0;

    while (queue.length && !pathDistance) {
      const v = queue.shift();
      const neighbours = this.adjacencyList.get(v.coords);

      neighbours.forEach(n => {
        if (!visited.has(n)) {
          visited.add(n);
          if (n === this.end) pathDistance = v.distance + 1;

          queue.push({ coords: n, distance: v.distance + 1 });
        }
      });
    }

    return pathDistance;
  }
}

const graph = new Graph();

const checkEdge = (value: number, currentKey: string, i: number, j: number) => {
  const aboveZero = i >= 0 && j >= 0;
  const belowLength = i < grid.length && j < grid[0].length;

  if (aboveZero && belowLength) {
    const key = `${i} ${j}`;
    const nearValue = grid[i][j];
    let nearCode = nearValue.charCodeAt(0);

    if (nearValue === 'S') nearCode = 'a'.charCodeAt(0);
    if (nearValue === 'E') nearCode = 'z'.charCodeAt(0);
    if (nearCode <= value + 1) graph.addEdge(currentKey, key);
  }
};

const grid = data.split('\n').map(l => l.split(''));

grid.forEach((row, i) => {
  row.forEach((col, j) => {
    const key = `${i} ${j}`;
    let value = col.charCodeAt(0);

    if (col === 'S') {
      graph.addStart(key);
      value = 'a'.charCodeAt(0);
    }

    if (col === 'E') {
      graph.addEnd(key);
      value = 'z'.charCodeAt(0);
    }

    checkEdge(value, key, i - 1, j);
    checkEdge(value, key, i + 1, j);
    checkEdge(value, key, i, j - 1);
    checkEdge(value, key, i, j + 1);

    graph.addVertex(key);
  });
});

const result = graph.search();

console.log(result);