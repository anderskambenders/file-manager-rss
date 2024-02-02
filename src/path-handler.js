import { homedir } from 'os';
import path from 'path';


class PathHandler {
  constructor(emitter) {
    this.emitter = emitter
    this._currentPath = homedir();
    this.emitter.on('show-current-path', () => this.showCurrentPath());
    // this.emitter.on('get-current-path', (obj) => {
    //   if (obj.path === null) {
    //     obj.path = this.currentPath;
    //   }
    // });
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