import PathHandler from "./path-handler.js";
import User from "./user.js";

const getUserName = () => {
  const args = process.argv.slice(2);
  console.log(args)
  const argKey = '--username=';
  const defaultName = 'Username';
  const usernameArg = args.find(item => item.startsWith(argKey) );
  return usernameArg ? usernameArg.split('=')[1] : defaultName;
};

const welcomeUser = () => {
  const username = getUserName();
  const user = new User(username);
  const pathHandler = new PathHandler();
  console.log(`Welcome to the File Manager, ${user.name}!`)
  console.log(`To exit press "Ctrl + C" or '.exit'`);
  pathHandler.showCurrentPath();
};

export default welcomeUser;