import internal from 'stream';
import { input } from './input.js';
import { sample } from './sample.js';

type Parent = Directory | null;
type Item = Directory | File;
// CLASSES
class File {
   name: string;
   size: number;

   constructor(name: string, size: number) {
      this.name = name;
      this.size = size;
   }

   static of([size, name]: string[]) {
      return new File(name, parseInt(size, 10));
   }
}

class Directory {
   key: string;
   parent: Parent;
   children: Item[];

   constructor(key: string, parent: Parent = null) {
      this.key = key;
      this.parent = parent;
      this.children = [];
   }

   get size() {
      return this.children.reduce((sum, child) => {
         if (child instanceof Directory) {
            return sum + child.size;
         }

         return sum + child.size;
      }, 0);
   }

   static of(key: string, parent?: Directory) {
      return new Directory(key, parent);
   }
}

class FileSystem {
   root: Directory;
   active: Directory;
   directories: Directory[];
   private static instance: FileSystem;

   constructor(rootDir: Directory) {
      this.root = rootDir;
      this.active = rootDir;
      this.directories = [];
   }

   insert(item: Item) {
      this.active.children.push(item);
   }

   move(command: string) {
      switch (command) {
         case '/':
            this.active = this.root;
            break;
         case '..':
            this.active = this.active.parent;
            break;
         default:
            const subDir = this.active.children.find(
               (item) => item instanceof Directory && item.key === command
            ) as Directory;
            if (subDir) {
               this.active = subDir;
            }
            break;
      }
   }

   public static getInstance(x: string) {
      if (!FileSystem.instance) {
         FileSystem.instance = FileSystem.root(x);
      }

      return FileSystem.instance;
   }

   static root(x: string) {
      return new FileSystem(Directory.of(x));
   }
}

// UTILS
const isNumber = (s: string) => isFinite(parseInt(s, 10));
let system: FileSystem;
const lineParser = (line: string) => {
   const items = line.split(' ');

   if (items[0] === '$') {
      if (items[1] === 'cd') {
         if (!system) {
            system = FileSystem.getInstance(items[2]);
         } else {
            system.move(items[2]);
         }
      }
   }

   if (isNumber(items[0])) {
      system.insert(File.of(items));
   }

   if (items[0] === 'dir') {
      const dir = Directory.of(items[1], system.active);
      system.insert(dir);
      system.directories.push(dir);
   }
};

// MAIN

const data = input || sample;

data.split('\n').forEach(lineParser);

const total = system.directories
   .map((dir) => dir.size)
   .filter((n) => n <= 100_000)
   .reduce((sum, num) => sum + num, 0);

console.log(total);

