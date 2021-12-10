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

  it('should be seen in projects', async function() {
    this.timeout(0);
    const user = new MockCLIUser('vlm', ['ws', 'projects'], {
      cwd: config.tmpDir
    });

    const output = await user.waitFor('Projects');

    expect(output.includes(config.project)).to.be.true;
  });

  it('should remove project', async function() {
    this.timeout(0);
    const user = new MockCLIUser('vlm', ['ws', 'remove', config.project], {
      cwd: config.tmpDir
    });

    await user.test([
      ['Are you sure you want to delete?', 'y', `${config.project} has been removed!`],
      ['Would you also like to delete the project\'s directory?', 'y']
    ]);

    await user.waitFor('Have a great day!');
  });

  it('should no longer be seen in projects', async function() {
    this.timeout(0);
    const user = new MockCLIUser('vlm', ['ws', 'projects'], {
      cwd: config.tmpDir
    });

    await user.waitFor('There are no projects currently registered');
    await user.waitFor('Have a great day!');
  });
});