import { run } from "@vlegm/util";

describe('ws: init', () => {
  it('should initialize workstation', async () => {
    await run('yarn', ['cli']);
  });
});