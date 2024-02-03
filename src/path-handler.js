import { homedir } from 'os';
import path from 'path';


class PathHandler {
  constructor() {
    this._currentPath = homedir();
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