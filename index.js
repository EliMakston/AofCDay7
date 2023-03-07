const lineReader = require('line-reader');
let currentDirectory = '';
let checkFiles = false;

/*
lineReader.eachLine('./input.txt', (line, last) => {
  interpretLine(line);
  if (last) {
    return false;
  }
});
*/

class File {
  constructor(name, size, location) {
    this.name = name;
    this.size = size;
    this.location = location;
  }
}

class Directory {
  constructor(name, location, files) {
    this.name = name;
    this.location = location;
    this.files = files;
    this.size = 0;
  }
}

let fileSys = new Directory('/', '', []);
let tempDirectory = fileSys;
let tempFileSys = fileSys;

function interpretLine(line) {
  if (checkFiles && !line.includes('$')) {
    console.log('In current directory: ' + line);
  }
  if (line.includes('$')) {
    if (checkFiles) {
      checkFiles = false;
    }
    if (line.includes('cd ')) {
      console.log('Found cd command: ' + line);
      navigateDirectory(findDirectory(line));
      console.log('New directory: ' + currentDirectory);
    }
    if (line.includes('ls')) {
      console.log('Found ls command: ' + line);
      checkFiles = true;
    }
  }
}

function findDirectory(line) {
  let directory = '';
  for (let i = line.length - 1; i >=0; i--) {
    if (line[i] === ' ') {
      break;
    }
    directory = line[i] + directory;
  }
  return directory;
}

function navigateDirectory(directory) {
  if (directory === '/') {
    currentDirectory = '/';
  } else if (directory === '..') {
    for (let i = currentDirectory.length - 1; i >=0; i--) {
      if (currentDirectory[i] === '/') {
        currentDirectory = currentDirectory.substring(0, i);
        break;
      }
    }
  } else {
    currentDirectory += `/${directory}`
  }
}

function create(line) {
  console.log('Create run');
}

currentDirectory = '/';
create('dir qcznqph');
console.log(fileSys);
currentDirectory = '//qcznqph'
create('dir asdfras');
console.log(fileSys);