import {run} from "@vlegm/util";
import {spawn} from "child_process";
import mockStdin from "mock-stdin";
const stdin = mockStdin.stdin();

const delay = (ms:number = 1000) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

describe('ws: init', () => {
  it('should initialize workstation', async function () {
    this.timeout(0);
    const child = spawn('yarn', ['cli', 'ws', 'init', 'tmp-test']);
    child.stdout.pipe(process.stdout);

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