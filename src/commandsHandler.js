import { createInterface } from 'readline';
import { parseLine } from './utils/parseLine.js';
import PathHandler from "./path-handler.js";
import fs from 'node:fs/promises';
import { resolve } from 'path';

class CommandHandler {
  constructor(emitter) {
    this.emitter = emitter;
    this.pathHandler = new PathHandler(this.emitter);
  }

  commandInteraction = () => {
    process.stdin.on('keypress', (_, key) => {
      if ( key.ctrl && key.name === 'c' ) {
        this.emitter.emit('exit');
      }
    });
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on('line', async (line) => {
      await this.executeCommand(line.toString().trim());
      if (line.toString().trim() === '.exit') {
        this.emitter.emit('exit');
      }
    })
    .on('error', (err) => {
      console.log(err);
    });
  };

  getCommand = (command) => {
    const commandMap = {
        ls: this.ls,
        up: this.up,
        cd: this.cd,
    };
    return commandMap[command];
  }

  async executeCommand (str) {
    try {
        const commandObj = parseLine(str);
        const commandFn = this.getCommand(commandObj.command);
        if (commandFn && commandObj.args) {
          console.log(commandFn, ...commandObj.args)
          await commandFn(commandObj.args);
        } else if (commandFn && !commandObj.args) {
          await commandFn();
        } else {
            console.log('Invalid input');
        }
    } catch (err) {
      console.log('Operation failed');
    }
    this.emitter.emit('show-current-path');
  }

  up = async () => {
    const newPath = resolve(this.pathHandler.currentPath, '..');
    process.chdir(newPath);
    this.pathHandler.currentPath = newPath;
};

  cd = async (destination) => {
    const newPath = resolve(this.pathHandler.currentPath, destination);
    process.chdir(newPath);
    this.pathHandler.currentPath = newPath;
  };

  ls = async () => {
    const files = await fs.readdir(this.pathHandler.currentPath, { withFileTypes: true });
    Promise.all(files);
    const filesList = files
        .map((file) => ({
            Name: file.name,
            Type: file.isFile() ? 'file' : 'directory',
        }))
        .sort((a, b) => a.Name.localeCompare(b.Name));
    console.table(filesList);
};


}

export default CommandHandler;