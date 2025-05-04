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
    rl.on('line', async () => {
    }).on('error', (error) => {
      console.log(error);
    })
  };

};

export default CommandsHandler;