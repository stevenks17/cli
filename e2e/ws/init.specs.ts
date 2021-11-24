import {expect} from "chai";
import {MockCLIUser} from "@vlegm/util";
import {config} from "../../configs/e2e";

describe('ws - empty project', () => {
  it('should initialize workstation', async function () {
    this.timeout(0);
    const user = new MockCLIUser('vlm', ['ws', 'init', config.project], {
      cwd: config.tmpDir
    });

    await user.send('Use a config file?', 'n');
    await user.send('Add git repos?', 'n');
    await user.send('Predefined Services:');
    await user.send('Add environment variables?','n');
    await user.send('Create your workstation?', 'y');
    await user.send('Print workstation config?', 'y');
    await user.send('Destination?');
    await user.waitTillDone();
  });

  it('should be able query projects', async function() {
    this.timeout(0);
    const user = new MockCLIUser('vlm', ['ws', 'projects'], {
      cwd: config.tmpDir
    });

    const output = await user.waitFor('Projects');

    expect(output.includes(config.project)).to.be.true;
  })

  it('should remove project', async function() {
    this.timeout(0);
    const user = new MockCLIUser('vlm', ['ws', 'remove', config.project], {
      cwd: config.tmpDir
    });

    const output = await user.waitFor('has been removed');

    expect(output.includes(config.project)).to.be.true;
  });
});