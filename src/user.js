class User {
  constructor(emitter) {
    this._name = User.getUserName();
    this.emitter = emitter;
  }
  static getUserName = () => {
    const args = process.argv.slice(2);
    const argKey = '--username=';
    const defaultName = 'Username';
    const usernameArg = args.find(item => item.startsWith(argKey));
    return usernameArg ? usernameArg.split('=')[1] : defaultName;

  }
  welcomeUser () {
    console.log(`Welcome to the File Manager, ${this._name}!`)
    console.log(`To exit press "Ctrl + C" or '.exit'`);
  };
};

export default User;
