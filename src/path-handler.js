import { homedir } from 'os';
import path from 'path';


class PathHandler {
  constructor(emitter) {
    this._currentPath = homedir();
    this.emitter = emitter;
    this.emitter.on('show-curr-path', () => this.showCurrentPath())
  }
  get currentPath() {
    return this._currentPath;
  }
  set currentPath(path) {
    this._currentPath = path;
  }

  setHomePath () {
    setCurrentPath(homedir());
  }

  getAbsoluteIfNot = (filePath) => {
    return path.isAbsolute(filePath) ? filePath : path.resolve(this._currentPath, filePath) ;
}

  showCurrentPath = () => {
    console.log(`You are currently in ${this._currentPath}`);
  };
}

export default PathHandler;