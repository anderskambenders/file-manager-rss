import { homedir } from 'os';

class PathHandler {
  constructor(emitter) {
    this._currentPath = homedir();
    this.emitter = emitter;
    this.emitter.on('show-current-path', () => this.showCurrentPath());
  }

  showCurrentPath = () => {
    console.log(`You are currently in ${this._currentPath}`);
  };
};

export default PathHandler;