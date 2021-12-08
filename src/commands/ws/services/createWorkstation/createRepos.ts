import { run } from '@vlegm/util';
import {getRoot} from "../getRoot";
import { normalize } from 'path';

export async function createRepos(config: WorkstationConfiguration): Promise<any> {
  if (!config.repos) {
    return;
  }

  return config.repos.reduce((tail, repInfo) => {
    const command = repInfo.init.split(' ');
    const [,name] = /\/(.+).git$/.exec(repInfo.url);
    const root = getRoot(config.name);

    return tail
      .then(() => run('git', ['clone', repInfo.url], { cwd: root }))
      .then(() => run(command[0], command.slice(1), { cwd: normalize(`${root}/${name}`), shell:true }));
  }, Promise.resolve() as Promise<any>);
}