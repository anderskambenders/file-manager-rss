import { createInterface } from "node:readline";

class CommandsHandler {
  constructor(emitter) {
    this.emitter = emitter;
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

    };
    return commandMap[command];
  }

  async executeCommand () {
    try {
    } catch (error) {
      console.log('Operation failed');
      console.error(error)
    }
    this.pathHandler.showCurrentPath();
  }
};

export default CommandsHandler;