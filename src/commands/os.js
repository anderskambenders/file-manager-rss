import os from 'node:os';

const eol = async () => console.log(JSON.stringify(os.EOL));
const cpus = async () => console.log(os.cpus());
const homedir = async () => console.log(os.homedir());
const username = async () => console.log(os.userInfo().username);
const architecture = async () => console.log(os.arch());
export const osCommand = async (arg) => {
    const argMap = {
        '--EOL': eol,
        '--cpus': cpus,
        '--homedir': homedir,
        '--username': username,
        '--architecture': architecture
    };
    const commandFn = argMap[arg];
    await commandFn();
};

