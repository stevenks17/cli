import {spawn} from "child_process";
import {User} from "../utils/User";
import {config} from "../../configs/e2e";

describe('ws: init', () => {
  it('should initialize workstation', async function () {
    this.timeout(0);
    const child = spawn('vlm', ['ws', 'init', 'tmp-test'], {
      stdio: ['pipe', 'pipe', 'inherit'],
      cwd: config.root
    });

    console.log('config', config.root);

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