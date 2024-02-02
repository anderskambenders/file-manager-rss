import CommandHandler from "./commandsHandler.js";
import User from "./user.js";
import EventEmitter from "node:events";

class FileManager {

  constructor() {
    this.emitter = new EventEmitter();
    this.user = new User(this.emitter);
    this.commandHandler = new CommandHandler(this.emitter);
  }

  async init() {
    this.user.welcomeUser();
    this.commandHandler.commandInteraction();
  };
}

export default FileManager;