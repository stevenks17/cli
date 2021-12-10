import {expect} from "chai";
import {MockCLIUser} from "@vlegm/utils";
import {config} from "../../configs/e2e";

describe('ws - empty project', () => {
  it('should initialize workstation', async function () {
    this.timeout(0);
    const user = new MockCLIUser('vlm', ['ws', 'init', config.project], {
      cwd: config.tmpDir
    });

    user.test([
      ['Use a config file?', 'n'],
      ['Add git repos?', 'n'],
      ['Predefined Services:'],
      ['Add environment variables?','n'],
      ['Create your workstation?', 'y'],
      ['Print workstation config?', 'y'],
      ['Destination?']
    ]);

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