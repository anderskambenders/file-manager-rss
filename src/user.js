const getUserName = () => {
  const args = process.argv.slice(2);
  const argKey = '--username=';
  const defaultName = 'Username';
  const usernameArg = args.find(item => item.startsWith(argKey) );
  return usernameArg ? usernameArg.split('=')[1] : defaultName;
};

class User {

  constructor () {
    this._name = getUserName();
  };
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

}

export default User;