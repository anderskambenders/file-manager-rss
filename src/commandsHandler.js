import { createInterface } from "node:readline";
import PathHandler from "./pathHandler.js";
import { cd } from "./commands/cd.js";
import { ls } from "./commands/ls.js";
import { up } from "./commands/up.js";
import { add } from "./commands/add.js";
import { cat } from "./commands/cat.js";
import { mkdir } from "./commands/mkdir.js";
import { mv } from "./commands/mv.js";
import { cp } from "./commands/cp.js";
import { hash } from "./commands/hash.js";
import { rn } from "./commands/rn.js";
import { rm } from "./commands/rm.js";
import { compress } from "./commands/compress.js";
import { decompress } from "./commands/decompress.js";
import { osCommand } from "./commands/os.js";
import parseLine from "./parseLine.js";

class CommandsHandler {
  constructor(emitter) {
    this.emitter = emitter;
    this.pathHandler = new PathHandler(this.emitter);
  };

  commandsInteraction = () => {
    process.stdin.on('keypress', (_, key) => {
      if (key.ctrl && key.name === 'c') {
        this.emitter.emit('exit');
      }
    });
    const rl = createInterface({
      input: process.stdin,
      output:process.stdout,
    });
    rl.on('line', async (line) => {
      await this.executeCommand(line.toString().trim());
      if (line.toString().trim() === '.exit') {
        this.emitter.emit('exit');
      }
    }).on('error', (error) => {
      console.log(error);
    })
  };

  getCommand = (command) => {
    const commandMap = {
        add, cat, cd, cp, ls, mkdir, mv, rm, rn, up, os: osCommand, hash, compress, decompress
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
    } catch (e) {
      console.log('Operation failed');
    }
    this.pathHandler.showCurrentPath();
  }
};

export default CommandsHandler;