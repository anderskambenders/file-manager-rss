import { createInterface } from "node:readline";
import PathHandler from "./pathHandler.js";
import { cd } from "./commands/cd.js";
import { ls } from "./commands/ls.js";
import { up } from "./commands/up.js";
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
        cd: cd,
        up: up,
        ls: ls,
    };
    return commandMap[command];
  }

  async executeCommand (str) {
    try {
      const commandObj = parseLine(str);
      const commandFn = this.getCommand(commandObj.command);
      if (commandFn && commandObj.args) {
        await commandFn(this.pathHandler ,...commandObj.args);
      } else if (commandFn && !commandObj.args) {
        await commandFn(this.pathHandler);
      } else {
          console.log('Invalid input');
      };
    } catch (error) {
      console.log('Operation failed');
      console.error(error)
    }
    this.pathHandler.showCurrentPath();
  }
};

export default CommandsHandler;