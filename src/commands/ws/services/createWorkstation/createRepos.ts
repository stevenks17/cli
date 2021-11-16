import {getRoot} from "../getRoot";
import { run } from '@vlegm/utils';

export async function createRepos(config: WorkstationConfiguration): Promise<any> {
  if (!config.repos) {
    return;
  }

  return config.repos.reduce((tail, repInfo) => {
    const command = repInfo.init.split(' ');
    const [,name] = /\/(.+).git$/.exec(repInfo.url);
    const root = getRoot(config);

    return tail
      .then(() => run('git', ['clone', repInfo.url], { cwd: root }))
      .then(() => run(command[0], command.slice(1), { cwd: `${root}/${name}` }));
  }, Promise.resolve() as Promise<any>);
}