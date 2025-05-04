import EventEmitter from 'node:events';
import User from './user.js';


class FileManager {
  constructor() {
    this.emitter = new EventEmitter();
    this.user = new User(this.emitter);
  }

  async init() {
    this.user.welcomeUser();
  };

};

export default FileManager;