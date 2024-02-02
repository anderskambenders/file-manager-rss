import commandInteraction from "./command-interraction.js";
import welcomeUser from "./welcome.js";

class FileManager {

  constructor(user, pathHandler) {
    this.user = user;
    this.pathHandler = pathHandler;
  }

  async init() {
    welcomeUser(this.user, this.pathHandler);
    commandInteraction(this.user, this.pathHandler);
  };
}

export default FileManager;