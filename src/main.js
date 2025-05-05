import EventEmitter from 'node:events';
import User from './user.js';
import CommandsHandler from './commandsHandler.js';


class FileManager {
  constructor() {
    this.emitter = new EventEmitter();
    this.user = new User(this.emitter);
    this.commandsHandler = new CommandsHandler(this.emitter)
  }

  async init() {
    this.user.welcomeUser();
    this.commandsHandler.commandsInteraction();
  };

};

export default FileManager;