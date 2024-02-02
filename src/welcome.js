const welcomeUser = (user, pathHandler) => {
  console.log(`Welcome to the File Manager, ${user.name}!`)
  console.log(`To exit press "Ctrl + C" or '.exit'`);
  pathHandler.showCurrentPath();
};

export default welcomeUser;