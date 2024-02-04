import { createInterface } from 'readline';
import { ls } from './commands/ls.js';
import { up } from './commands/up.js';
import { cd } from './commands/cd.js';
import { cat } from './commands/cat.js';
import { add } from './commands/add.js';
import { rn } from './commands/rn.js';
import { cp } from './commands/cp.js';
import { mv } from './commands/mv.js';
import { rm } from './commands/rm.js';
import { hash } from './commands/hash.js';
import { parseLine } from './utils/parseLine.js';
import PathHandler from "./path-handler.js";
import { osCommand } from './commands/os.js';
import { compress } from './commands/compress.js';
import { decompress } from './commands/decompress.js';

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
        ls: ls,
        up: up,
        cd: cd,
        cat: cat,
        add: add,
        rn: rn,
        cp: cp,
        mv: mv,
        rm: rm,
        os: osCommand,
        hash: hash,
        compress: compress,
        decompress: decompress,
    };
    return commandMap[command];
  }

  async executeCommand (str) {
    try {
        const commandObj = parseLine(str);
        const commandFn = this.getCommand(commandObj.command);
        if (commandObj.command === 'os') {
          await osCommand(commandObj.args)
        } else if (commandFn && commandObj.args) {
          await commandFn(this.pathHandler ,...commandObj.args);
        } else if (commandFn && !commandObj.args) {
          await commandFn(this.pathHandler);
        } else {
            console.log('Invalid input');
        }
    } catch (err) {
      console.log('Operation failed');
      console.error(err)
    }
    this.pathHandler.showCurrentPath();
  }

}

export default CommandHandler;