import { input } from './input.js';
import { sample } from './sample.js';

const data = input || sample;

const getId = (l: string) => parseInt(l.match(/\d+/)[0], 10);
const getItems = (l: string) =>
  l
    .split(' ')
    .filter((w) => /\d/.test(w))
    .map((n) => parseInt(n.replace(',', ''), 10));
const getOperation = (l: string) => {
  const symbol = l.match(/[\+\*]/g)[0];
  const val = l.match(/\d+/);

  if (val) {
    const num = parseInt(val[0], 10);
    return symbol === '+' ? (n: number) => n + num : (n: number) => n * num;
  }

  return (n: number) => n * n;
};
const getTest = (l: string) => {
  const num = parseInt(l.match(/\d+/)[0], 10);
  return (n: number) => n % num === 0;
};
const getTarget = (l: string) => parseInt(l.match(/\d+/)[0], 10);

interface MonkeyProps {
  id: number;
  items: number[];
  operation: Operation;
  test: Test;
  targets: Targets;
}

type Operation = (x: number) => number;
type Test = (n: number) => boolean;
type Targets = [number, number];

class Monkey {
  id: number;
  items: number[];
  operation: Operation;
  test: Test;
  targets: Targets;
  inspections: number;

  constructor({ id, items, operation, targets, test }: MonkeyProps) {
    this.id = id;
    this.inspections = 0;
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.targets = targets;
  }

  inspect(item: number) {
    const newItemValue = Math.floor(this.operation(item) / 3);
    this.inspections++;

    if (this.test(newItemValue)) {
      monkeys.throwTo(this.targets[0], newItemValue);
    } else {
      monkeys.throwTo(this.targets[1], newItemValue);
    }
  }

  getItem(item: number) {
    this.items.push(item);
  }

  turn() {
    while (this.items.length > 0) {
      const item = this.items.shift();
      this.inspect(item);
    }
  }

  static setup(x: MonkeyProps) {
    return new Monkey(x);
  }
}

class Monkeys {
  monkeys: Monkey[];

  constructor() {
    this.monkeys = [];
  }

  throwTo(id: number, item: number) {
    this.monkeys[id].getItem(item);
  }

  addMonkey(instruction: string) {
    const [idLine, itemsLine, operationLine, testLine, trueLine, falseLine] = instruction.split('\n');

    const id = getId(idLine);
    const items = getItems(itemsLine);
    const operation = getOperation(operationLine);
    const test = getTest(testLine);
    const targets = [getTarget(trueLine), getTarget(falseLine)] as Targets;

    this.monkeys.push(Monkey.setup({ id, items, operation, test, targets }));
  }

  playRound() {
    this.monkeys.forEach((monkey) => monkey.turn());
  }

  getMostActives() {
    const [first, second, ...rest] = this.monkeys.map((monkey) => monkey.inspections).sort((a, b) => b - a);
    return first * second;
  }
}

const monkeys = new Monkeys();

const instructions = data.split('\n\n');

instructions.forEach((instruction) => monkeys.addMonkey(instruction));

for (let i = 0; i < 20; i++) {
  monkeys.playRound();
}

console.log(monkeys.getMostActives());
