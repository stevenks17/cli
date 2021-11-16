import {ChildProcess, spawn} from "child_process";

class User {
  waitingFor?:string;
  willSend?:string[];
  resolve?:Function;
  prompt?:string;
  sentInput: boolean = false;
  lastOutput?: string;

  constructor(
    public child:ChildProcess
  ) {
    child.stdout.pipe(process.stdout);
    child.stdout.on('data', (data:Buffer) => {
      if(!this.resolve) {
        return;
      }

      const output = data.toString('utf-8');
      if(output.includes(this.prompt) && !this.sentInput) {
        return this.doSend();
      }

      if(output.includes('?') && !output.includes(this.prompt)) {
        this.lastOutput = output;
        this.resolveSend();
      }
    });
  }

  private resolveSend() {
    this.resolve();
    this.resolve = null;
    this.waitingFor = null;
    this.sentInput = false;
    this.prompt = null;
    this.willSend = null
  }

  private doSend() {
    this.sentInput = true;
    this.willSend.forEach((chunk) => this.child.stdin.write(chunk));
  }

  send(prompt: string, chunks:string[], message?:string) {
    this.prompt = prompt;
    this.willSend = chunks;
    this.waitingFor = message;

    if(this.lastOutput && this.lastOutput.includes(this.prompt)) {
      this.doSend();
    }

    return new Promise((resolve) => this.resolve = resolve);
  }

  waitTillDone() {
    return new Promise<void>((resolve) => {
      this.child.on('exit', () => resolve());
    })
  }
}

describe('ws: init', () => {
  it('should initialize workstation', async function () {
    this.timeout(0);
    const child = spawn('yarn', ['cli', 'ws', 'init', 'tmp-test'], {
      stdio: ['pipe', 'pipe', 'inherit']
    });

    const user = new User(child);

    await user.send('Use a config file?', ['n', '\x0D']);
    await user.send('Add git repos?', ['n', '\x0D']);
    await user.send('Predefined Services:', ['\x0D']);
    await user.send('Add environment variables?', ['n', '\x0D']);
    await user.send('Print workstation config?', ['n', '\x0D']);
    await user.send('Create your workstation?', ['n', '\x0D']);
    await user.waitTillDone();
  });
});