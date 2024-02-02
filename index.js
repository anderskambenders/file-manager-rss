import  FileManager from "./src/main.js";
import PathHandler from "./src/path-handler.js";
import User from "./src/user.js";

const user = new User();
const pathHandler = new PathHandler();
const app = new FileManager(user, pathHandler);
await app.init();