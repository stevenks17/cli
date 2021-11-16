import {run} from "@vlegm/util";
import {ChildProcess, spawn} from "child_process";
import mockStdin from "mock-stdin";
const stdin = mockStdin.stdin();

class User {
  constructor(
    public child:ChildProcess
  ) {
    child.stdout.pipe(process.stdout);
    child.stdout.on('data', (data) => {
      if(data.toString().includes('Have a great day!')) {
        console.log('HIT!');
      }
    });
  }
}
function send(child:ChildProcess, chunk:string) {

}

const delay = (ms:number = 1000) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

describe('ws: init', () => {
  it('should initialize workstation', async function () {
    this.timeout(0);
    const child = spawn('yarn', ['cli', 'ws', 'init', 'tmp-test'], {
      stdio: ['pipe', 'pipe', 'inherit']
    });

    const user = new User(child);

    await delay();
    child.stdin.write('n');
    child.stdin.write('\x0D');
    await delay();
    child.stdin.write('n');
    child.stdin.write('\x0D');
    await delay();
    child.stdin.write('\x0D');
    await delay();
    child.stdin.write('n');
    child.stdin.write('\x0D');
    await delay();
    child.stdin.write('n');
    child.stdin.write('\x0D');
    await delay();
    child.stdin.write('y');
    child.stdin.write('\x0D');
    await delay();
    //child.kill();
  });
});