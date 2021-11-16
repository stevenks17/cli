import {ChildProcess, spawn} from "child_process";

class User {
  waitingFor?:string;
  willSend?:string[];
  resolve?:Function;
  prompt?:string;
  sentInput: boolean = false;
  lastOutput?: string;

  constructor(
    public child:ChildProcess,
    public promptID: string = '?'
  ) {
    child.stdout.pipe(process.stdout);
    child.stdout.on('data', (data:Buffer) => {
      if(!this.resolve) {
        return;
      }

      const output = data.toString('utf-8');
      if(output.includes(this.promptID)) {
        if(output.includes(this.prompt)) {
          !this.sentInput && this.doSend();
        } else {
          this.lastOutput = output;
          this.resolveSend();
        }
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

  send(prompt: string, answer?:string | string[], message?:string) {
    this.prompt = prompt;
    this.waitingFor = message;

    if(Array.isArray(answer)) {
      this.willSend = answer;
    } else if(typeof answer === 'string') {
      this.willSend = [answer];
    } else {
      this.willSend = [];
    }

    if(this.willSend[this.willSend.length - 1] !== '\x0D') {
      this.willSend.push('\x0D');
    }

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
    await user.send('Use a config file?', 'n');
    await user.send('Add git repos?', 'n');
    await user.send('Predefined Services:');
    await user.send('Add environment variables?','n');
    await user.send('Create your workstation?', 'y');
    await user.send('Print workstation config?', 'y');
    await user.send('Destination?');
    await user.waitTillDone();
  });
});