const getUserName = () => {
  const args = process.argv.slice(2);
  const argKey = '--username=';
  const defaultName = 'Username';
  const usernameArg = args.find(item => item.startsWith(argKey) );
  return usernameArg ? usernameArg.split('=')[1] : defaultName;
};

class User {
  constructor (emitter) {
    this._name = getUserName();
    this.emitter = emitter;
    this.emitter.on('exit', () => this.exit());
  };

  welcomeUser () {
    console.log(`Welcome to the File Manager, ${this._name}!`)
    console.log(`To exit press "Ctrl + C" or '.exit'`);
    this.emitter.emit('show-current-path');
  }

  exit = async () => {
    console.log(`Thank you for using File Manager, ${this._name}, goodbye!`);
    process.exit();
  };
}

export default User;