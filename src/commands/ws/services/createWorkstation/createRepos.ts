import { WorkstationConfiguration } from "../../../../types";
import { run, zone } from 'ajc-util';
import { REPL_MODE_SLOPPY } from "repl";

export async function createRepos(config: WorkstationConfiguration) {
  if (!config.repos) {
    return;
  }

  console.log('Cloning repos');

  const zonedRun = zone(run, null, null, { cwd: config.root });

  const tail = Promise.resolve();
  const setups = config.repos.map((repInfo) => {
    zonedRun('git', ['clone', repInfo.url]);

    const command = repInfo.init.split(' ');
    zonedRun(command[0], command.slice(1))
  });

  return Promise.all(setups);
}