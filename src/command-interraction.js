import { createInterface } from 'readline';
// import commandHandler from './commandHandler.js';


export const exit = async (user) => {
  console.log(`Thank you for using File Manager, ${user.name}, goodbye!`);
  process.exit();
};

const commandInteraction = (user) => {

    process.stdin.on('keypress', (_, key) => {
        if ( key.ctrl && key.name === 'c' ) {
            exit(user);
        }
    });

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('line', async (line) => {
            console.log(line.toString())
            if (line.toString().trim() === '.exit') {
              exit(user)
            }
        })
        .on('error', (err) => {
            console.log(err);
        });
};


export default commandInteraction;